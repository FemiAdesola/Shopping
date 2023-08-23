import React from 'react';
import ProductList from '../Components/Product/ProductList';
import { Banner } from '../Components/common';

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="container p-2">
        <ProductList />
      </div>
    </div>
    );
};

export default Home;