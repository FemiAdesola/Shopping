import React from 'react';
import {CartPickUp, CartSummary} from "./index"
import { userAuth } from '../../HOC';

const Cart = () => {
    return (
      <div className="row w-100" style={{ marginTop: "10px" }}>
        <div className="col-lg-6 col-12" style={{ fontWeight: 300 }}>
           <CartSummary/>
        </div>
        <div className="col-lg-6 col-12 p-4 ">
            <CartPickUp/>
        </div>
      </div>
    );
};

export default userAuth(Cart);