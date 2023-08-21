import React from 'react';
import { CartItemsType, orderSummaryType } from '../../types';

const OrderSummary = ({ data, userInput }: orderSummaryType) => {
  return (
    <div>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-success">Order Summary</h3>
          </div>
          <div className="mt-3">
            <div className="border py-3 px-2">Name : {userInput.name}</div>
            <div className="border py-3 px-2">Email : {userInput.email}</div>
            <div className="border py-3 px-2">
              Phone : {userInput.phoneNumber}
            </div>
            <div className="border py-3 px-2">
              <h4 className="text-success">Menu Items</h4>
              <div className="p-3">
                {data.cartItems?.map(
                  (cartItem: CartItemsType, index: number) => {
                    return (
                      <div className="d-flex" key={index}>
                        <div className="d-flex w-100 justify-content-between">
                          <p>{cartItem.product?.title}</p>
                          <p>
                            € {cartItem.product?.price} x {cartItem.quantity}  = 
                          </p>
                        </div>
                        <p style={{ width: "70px", textAlign: "right" }}>
                          €
                          {((cartItem.product?.price ?? 0) *
                            (cartItem.quantity ?? 0)).toFixed(2)}
                        </p>
                      </div>
                    );
                   }
                )} 
                <hr />
                <h4 className="text-danger" style={{ textAlign: "right" }}>
                  €{data.cartTotal?.toFixed(2)}
                </h4>
              </div>
            </div>
          </div>
    </div>
  );
};

export default OrderSummary;