import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

import { Footer, Header } from '../Components/Layout';
import {Home, Login, NotFound, Register} from '../Pages/index';
import { ProductDetails } from '../Components/Product/index';
import { useGetCartsQuery } from '../Apis/cartApi';
import { setCart } from '../Redux/cartSlice';
import { Cart } from '../Components/cart';
import { userType } from '../types';
import { setLoggedInUser } from '../Redux/userSlice';
import { AccessDenied, AuthAdmin, AuthTest } from '../Auth';

function App() {
  const dispatch = useDispatch();
   const { data, isLoading } = useGetCartsQuery(
     "559a7266-4562-44a6-901d-5764a9949088"
   );
  
   useEffect(() => {
     if (!isLoading && data) {
      dispatch(setCart(data.result?.cartItems));
     }
   }, [data]);
  
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userType = jwt_decode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, [])
  
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
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/authentication" element={<AuthTest />}></Route>
          <Route path="/authorization" element={<AuthAdmin />}></Route>
          <Route path="/accessDenied" element={<AccessDenied />}></Route>
          
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
