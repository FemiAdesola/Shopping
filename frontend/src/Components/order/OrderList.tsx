import React from 'react';

import { Loader } from "../../Components/common";
import { OrderType } from "../../types/order";
import OrderListType from '../../types/order';

const OrderList = ({ isLoading, orderData }: OrderListType) => {
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="table p-5">
          <h1 className="text-success"> Orders List </h1>
          <div className="p-2">
            <div className="row border">
              <div className="col-1">ID</div>
              <div className="col-2">Name</div>
              <div className="col-2">Phone</div>
              <div className="col-1">Total</div>
              <div className="col-1">Items</div>
              <div className="col-2">Date</div>
              <div className="col-1"></div>
            </div>
            {orderData!.map((orderItem: OrderType) => {
              return (
                <div className="row border" key={orderItem.orderId}>
                  <div className="col-1">{orderItem.orderId}</div>
                  <div className="col-2">{orderItem.pickupName}</div>
                  <div className="col-2">{orderItem.pickupPhoneNumber}</div>
                  <div className="col-1">
                    € {orderItem.orderTotal!.toFixed(2)}
                  </div>
                  <div className="col-1"># {orderItem.totalItems}</div>
                  <div className="col-2">
                    {new Date(orderItem.orderDate!).toLocaleDateString()}
                  </div>
                  <div className="col-1"></div>
                  <div className="col-1">
                    <button className="btn btn-success">Details</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderList;