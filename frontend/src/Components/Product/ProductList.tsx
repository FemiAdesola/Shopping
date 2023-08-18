import React from 'react';
import { useState, useEffect } from "react";
import { ProductType } from '../../types';
import  ProductCard  from './ProductCard';
import { useGetProductsQuery } from '../../Apis/productApi';
import { useDispatch } from 'react-redux';
import { setProduct } from '../../Redux/productSlice';
import { MainLoader } from '../common';

const ProductList = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetProductsQuery(null);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setProduct(data.result));
    }
  }, [isLoading]);

  if (isLoading) {
    return <div> <MainLoader/></div>;
  }
  
  return (
    <div className="container row">
      {data.result.length > 0 &&
        data.result.map((product: ProductType, index: number) => (
          <ProductCard product={product} key={index} />
        ))}
    </div>
  );
};

export default ProductList;