import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Footer, Header } from '../Components/Layout';
import {Home, NotFound} from '../Pages/index';
import { ProductDetails } from '../Components/Product/index';
import { useDispatch } from 'react-redux';
import { useGetCartsQuery } from '../Apis/cartApi';
import { setCart } from '../Redux/cartSlice';

const  App = () => {
  const dispatch = useDispatch();
   const { data, isLoading } = useGetCartsQuery(
     "559a7266-4562-44a6-901d-5764a9949088"
   );
  
   useEffect(() => {
     if (!isLoading && data) {
      dispatch(setCart(data.result?.cartItems));
     }
   }, [data]);
  
  return (
    <BrowserRouter>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/productDetails/:productId"
            element={<ProductDetails />}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
