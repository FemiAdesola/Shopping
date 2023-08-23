import React from 'react';
import { useState, useEffect } from "react";
import { ProductType } from '../../types';
import  ProductCard  from './ProductCard';
import { useGetProductsQuery } from '../../Apis/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../../Redux/productSlice';
import { MainLoader } from '../common';
import { RootState } from '../../Redux/store';

const ProductList = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetProductsQuery(null);
  const [products, setProducts] = useState<ProductType[]>([]);

    const searchValue= useSelector(
      (state: RootState) => state.searchStore.search
    );

    useEffect(() => {
      if (data && data.result) {
        // dispatch(setProduct(data.result));
        const searchProductArray = handleFilters(searchValue);
        setProducts(searchProductArray);
      }
    }, [searchValue]);
  
  useEffect(() => {
    if (!isLoading) {
      dispatch(setProduct(data.result));
      setProducts(data.result);
    }
  }, [isLoading]);


  const handleFilters = (
    search: string
  ) => {
    let searchArray = [...data.result];
    //search functionality
    if (search) {
      const newSearchArray = [...searchArray];
      searchArray = newSearchArray.filter((item: ProductType) =>
        item.category.toUpperCase().includes(search.toUpperCase())
      );
    }
    return searchArray;
  }



  if (isLoading) {
    return <div> <MainLoader/></div>;
  }
  
  return (
    <div className="container row">
      {products.length > 0 &&
        products.map((product: ProductType, index: number) => (
          <ProductCard product={product} key={index} />
        ))}
    </div>
  );
};

export default ProductList;