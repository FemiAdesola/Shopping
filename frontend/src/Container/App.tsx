import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Footer, Header } from '../Components/Layout';
import {Home, NotFound} from '../Pages/index';

function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
