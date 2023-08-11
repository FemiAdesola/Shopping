import React from 'react';
import { useState, useEffect } from "react";
import { ProductType } from '../../types';

const ProductList = () => {
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
      fetch("https://localhost:7099/api/v1/products")
        .then((response) => response.json())
        .then((data) => {
          console.log(data.result);
        });
    }, []);
    return (
        <div>
            
        </div>
    );
};

export default ProductList;