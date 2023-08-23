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
  const { data, isLoading } = useGetProductsQuery(null);
  const [products, setProducts] = useState<ProductType[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([""]);
  const [sortName, setSortName] = useState(SortTypes.NAME_A_Z);
  
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
    if (data && data.result) {
      // dispatch(setProduct(data.result));
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
      dispatch(setProduct(data.result));
      setProducts(data.result);

      const categoryListData = ["All"];
      data.result.forEach((item: ProductType) => {
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
        ? [...data.result]
        : data.result.filter(
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
  }

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
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center">
          {categoryList.map((categoryName, index) => (
            <li
              className="nav-item"
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
      {products.length > 0 &&
        products.map((product: ProductType, index: number) => (
          <ProductCard product={product} key={index} />
        ))}
    </div>
  );
};

export default ProductList;
