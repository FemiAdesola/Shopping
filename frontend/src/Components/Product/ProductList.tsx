import React from 'react';
import { useState, useEffect } from "react";
import { ProductType } from '../../types';
import  ProductCard  from './ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
      fetch("https://localhost:7099/api/v1/products")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.result);
        });
    }, []);
    return (
      <div className="container row">
        {products.length > 0 &&
          products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
      </div>
    );
};

export default ProductList;