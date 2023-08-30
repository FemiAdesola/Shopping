/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import { CartItemsType, orderSummaryType } from '../../types';
import statusColor from '../Helper/statusColor';
import { useNavigate } from 'react-router-dom';
import { PaymentStatus, Roles } from '../../Utils/StaticDetails';
import { RootState } from '../../Redux/store';
import { useSelector } from 'react-redux';
import { useUpdateOrderMutation } from '../../Apis/orderApi';
import { MainLoader } from '../common';

const OrderSummary = ({ data, userInput }: orderSummaryType) => {
  const colorStatus = statusColor(data.status!)
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.userStore);
  const [loading, setIsLoading] = useState(false);
  const [updateOrder] = useUpdateOrderMutation();

  const statusMessage: any =
    data.status! === PaymentStatus.CONFIRMED
      ? { color: "info", value: PaymentStatus.BEING_COOKED }
      : data.status! === PaymentStatus.BEING_COOKED
      ? { color: "warning", value: PaymentStatus.READY_FOR_PICKUP }
      : data.status! === PaymentStatus.READY_FOR_PICKUP && {
          color: "success",
          value: PaymentStatus.COMPLETED,
        };
  
    const handleNextStatus = async () => {
      setIsLoading(true);
      console.log(statusMessage.value);
      await updateOrder({
        orderId: data.id,
        status: statusMessage.value,
      });

      setIsLoading(false);
    };

  const handleCancel = async () => {
    setIsLoading(true);
    await updateOrder({
      orderId: data.id,
      status: PaymentStatus.CANCELLED,
    });
   
    setIsLoading(false);
  };

  return (
    <div>
      {loading && <MainLoader />}
      {!loading && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-success">Order Summary</h3>
            <span className={`btn btn-outline-${colorStatus} fs-6`}>
              {data.status}
            </span>
          </div>
          <div className="mt-3">
            <div className="border py-3 px-2">Name : {userInput.name}</div>
            <div className="border py-3 px-2">Email : {userInput.email}</div>
            <div className="border py-3 px-2">
              Phone : {userInput.phoneNumber}
            </div>
            <div className="border py-3 px-2">
              <h4 className="text-success">Product Items</h4>
              <div className="p-3">
                {data.cartItems?.map(
                  (cartItem: CartItemsType, index: number) => {
                    return (
                      <div className="d-flex" key={index}>
                        <div className="d-flex w-100 justify-content-between">
                          <p>{cartItem.product?.title}</p>
                          <p>
                            € {cartItem.product?.price} x {cartItem.quantity} =
                          </p>
                        </div>
                        <p style={{ width: "70px", textAlign: "right" }}>
                          €
                          {(
                            (cartItem.product?.price ?? 0) *
                            (cartItem.quantity ?? 0)
                          ).toFixed(2)}
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
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back to Orders
            </button>
            {userInfo.role == Roles.ADMIN && (
              <div className="d-flex">
                {data.status! !== PaymentStatus.CANCELLED &&
                  data.status! !== PaymentStatus.COMPLETED && (
                    <button
                      className="btn btn-danger mx-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  )}
                <button
                  className={`btn btn-${statusMessage.color}`}
                  onClick={handleNextStatus}
                >
                  {statusMessage.value}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;