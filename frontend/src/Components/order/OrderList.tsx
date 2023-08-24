import React from 'react';
import { useNavigate } from 'react-router-dom';

import { MainLoader } from "../../Components/common";
import { OrderType } from "../../types/order";
import OrderListType from '../../types/order';
import { statusColor } from '../Helper';

const OrderList = ({ isLoading, orderData }: OrderListType) => {
  const navigate = useNavigate();
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          {/* <h1 className="text-success"> Orders List </h1> */}
          <div className="p-2">
            <div className="row border">
              <div className="col-1">ID</div>
              <div className="col-2">Name</div>
              <div className="col-2">Phone</div>
              <div className="col-1">Total</div>
              <div className="col-1">Items</div>
              <div className="col-2">Date</div>
              <div className="col-2">Status</div>
              <div className="col-1"></div>
            </div>
            {orderData!.map((orderItem: OrderType) => {
              const colorStatus = statusColor(orderItem.status!);
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
                  <div className="col-2">
                    <span className={` badge rounded-pill bg-${colorStatus}`}>
                      {orderItem.status}
                    </span>
                  </div>
                  <div className="col-1">
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        navigate("/order/orderDetails/" + orderItem.orderId)
                      }
                    >
                      Details
                    </button>
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