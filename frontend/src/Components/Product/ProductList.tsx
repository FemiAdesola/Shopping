import React from "react";
import { useState, useEffect } from "react";
import { ProductType } from "../../types";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../../Apis/productApi";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../Redux/productSlice";
import { MainLoader } from "../common";
import { RootState } from "../../Redux/store";
import { SortTypes } from "../../Utils/StaticDetails";

const ProductList = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState<ProductType[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([""]);
  const [sortName, setSortName] = useState(SortTypes.NAME_A_Z);

  // about page
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 6,
  });
  //
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize); // for dropdown page
  const { data, isLoading } = useGetProductsQuery({
    pageNumber: pageOptions.pageNumber,
    pageSize: pageOptions.pageSize,
  });
  const handleDropDownPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handlePageOptionChange("change", Number(event.target.value));
    setCurrentPageSize(Number(event.target.value));
  };

  const sortOptions: Array<SortTypes> = [
    SortTypes.PRICE_LOW_HIGH,
    SortTypes.PRICE_HIGH_LOW,
    SortTypes.NAME_A_Z,
    SortTypes.NAME_Z_A,
  ];

  const searchValue: any = useSelector(
    (state: RootState) => state.searchStore.search
  );

  useEffect(() => {
    if (data && data.apiResponse.result) {
      const searchProductArray = handleFilters(
        sortName,
        selectedCategory,
        searchValue
      );
      setProducts(searchProductArray);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setProduct(data?.apiResponse.result));

      setProducts(data?.apiResponse.result); // take note
      const { TotalRecords } = JSON.parse(data?.totalRecords);
      setTotalRecords(TotalRecords);

      const categoryListData = ["All"];
      data?.apiResponse.result.forEach((item: ProductType) => {
        if (categoryListData.indexOf(item.category) === -1) {
          categoryListData.push(item.category);
        }
      });
      setCategoryList(categoryListData);
    }
  }, [isLoading]);

  const handleSortClick = (i: number) => {
    setSortName(sortOptions[i]);
    const tempArray = handleFilters(
      sortOptions[i],
      selectedCategory,
      searchValue
    );
    setProducts(tempArray);
  };

  const handleCategoryClick = (i: number) => {
    const buttons = document.querySelectorAll(".custom-buttons");
    let localCategory;
    buttons.forEach((button, index) => {
      if (index === i) {
        button.classList.add("active");
        if (index === 0) {
          localCategory = "All";
        } else {
          localCategory = categoryList[index];
        }
        setSelectedCategory(localCategory);
        const tempArray = handleFilters(sortName, localCategory, searchValue);
        setProducts(tempArray);
      } else {
        button.classList.remove("active");
      }
    });
  };

  const handleFilters = (
    sortType: SortTypes,
    category: string,
    search: string
  ) => {
    let tempArray =
      category === "All"
        ? [...data?.apiResponse.result]
        : data?.apiResponse.result.filter(
            (item: ProductType) =>
              item.category.toUpperCase() === category.toUpperCase()
          );

    //search functionality
    if (search) {
      const tempArray2 = [...tempArray];
      tempArray = tempArray2.filter((item: ProductType) =>
        item.title.toUpperCase().includes(search.toUpperCase())
      );
    }

    //sort
    if (sortType === SortTypes.PRICE_LOW_HIGH) {
      tempArray.sort((a: ProductType, b: ProductType) => a.price - b.price);
    }
    if (sortType === SortTypes.PRICE_HIGH_LOW) {
      tempArray.sort((a: ProductType, b: ProductType) => b.price - a.price);
    }
    if (sortType === SortTypes.NAME_A_Z) {
      tempArray.sort(
        (a: ProductType, b: ProductType) =>
          a.title.toUpperCase().charCodeAt(0) -
          b.title.toUpperCase().charCodeAt(0)
      );
    }
    if (sortType === SortTypes.NAME_Z_A) {
      tempArray.sort(
        (a: ProductType, b: ProductType) =>
          b.title.toUpperCase().charCodeAt(0) -
          a.title.toUpperCase().charCodeAt(0)
      );
    }
    return tempArray;
  };

  // pagination
  const getPageDetails = () => {
    const dataStartNumber =
      (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
    const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize;

    return `${dataStartNumber}
             - 
            ${
              dataEndNumber < totalRecords ? dataEndNumber : totalRecords
            } of ${totalRecords}`;
  };
  const handlePageOptionChange = (direction: string, pageSize?: number) => {
    if (direction === "prev") {
      setPageOptions({ pageSize: 6, pageNumber: pageOptions.pageNumber - 1 });
    } else if (direction === "next") {
      setPageOptions({ pageSize: 6, pageNumber: pageOptions.pageNumber + 1 });
    }
    // for dropdown page option change
    else if (direction === "change") {
      setPageOptions({
        pageSize: pageSize ? pageSize : 5,
        pageNumber: 1,
      });
    }
    //
  };
  //

  if (isLoading) {
    return (
      <div>
        {" "}
        <MainLoader />
      </div>
    );
  }

  return (
    <div className="container row">
      <h5 className="text-success">Total products: {totalRecords}</h5>
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center">
          {categoryList.map((categoryName, index) => (
            <li
              className="nav-item text-light"
              style={{ ...(index === 0 && { marginLeft: "auto" }) }}
              key={index}
            >
              <button
                className={`nav-link p-0 pb-2 custom-buttons fs-5 ${
                  index === 0 && "active"
                } `}
                onClick={() => handleCategoryClick(index)}
              >
                {categoryName}
              </button>
            </li>
          ))}
          <li className="nav-item dropdown" style={{ marginLeft: "auto" }}>
            <div
              className="nav-link dropdown-toggle text-dark fs-6 border"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sortName}
            </div>
            <ul className="dropdown-menu">
              {sortOptions.map((sortType, index) => (
                <li
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleSortClick(index)}
                >
                  {sortType}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      {(data?.apiResponse.result.length || products.length) > 0 &&
        (data?.apiResponse.result || products).map(
          (product: ProductType, index: number) => (
            <ProductCard product={product} key={index} />
          )
        )}
      {/* {(products.length) > 0 &&
        (products).map(
          (product: ProductType, index: number) => (
            <ProductCard product={product} key={index} />
          )
        )} */}
      {/*  */}
      <div className="d-flex mx-5 mt-4 justify-content-end align-items-center">
        <div>Rows per page: </div>
        <div>Rows per page: </div>
        <div>
          <select
            className="form-select mx-2"
            onChange={handleDropDownPage}
            style={{ width: "80px" }}
            value={currentPageSize}
          >
            <option>6</option>
            <option>12</option>
            <option>15</option>
            <option>20</option>
          </select>
        </div>
        <div className="mx-2">{getPageDetails()}</div>
        <button
          onClick={() => handlePageOptionChange("prev")}
          disabled={pageOptions.pageNumber === 1}
          className="btn btn-outline-primary px-3 mx-2"
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <button
          onClick={() => handlePageOptionChange("next")}
          disabled={
            pageOptions.pageNumber * pageOptions.pageSize >= totalRecords
          }
          className="btn btn-outline-primary px-3 mx-2"
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductList;
