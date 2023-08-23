import React from "react";
import { useState, useEffect } from "react";
import { ProductType } from "../../types";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../../Apis/productApi";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../Redux/productSlice";
import { MainLoader } from "../common";
import { RootState } from "../../Redux/store";

const ProductList = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetProductsQuery(null);
  const [products, setProducts] = useState<ProductType[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([""]);

  const searchValue = useSelector(
    (state: RootState) => state.searchStore.search
  );

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
        const dataArray = handleFilters(localCategory, searchValue);
        setProducts(dataArray);
      } else {
        button.classList.remove("active");
      }
    });
  };

  useEffect(() => {
    if (data && data.result) {
      // dispatch(setProduct(data.result));
      const searchProductArray = handleFilters(selectedCategory, searchValue);
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

  const handleFilters = (
    search: string,
    category: string
  ) => {
    let searchArray = [...data.result];
    //search functionality
    if (search) {
      const newSearchArray = [...searchArray];
      searchArray = newSearchArray.filter((item: ProductType) =>
        item.title.toUpperCase().includes(search.toUpperCase())
      );
    }
    return searchArray;
  };

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
