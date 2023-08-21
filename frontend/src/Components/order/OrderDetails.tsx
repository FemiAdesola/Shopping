import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderByIDQuery } from '../../Apis/orderApi';
import OrderSummary from './OrderSummary';

const OrderDetails = () => {
    const {id} = useParams();
    const { data, isLoading } = useGetOrderByIDQuery(id);
    let userInput, orderDetails;
    if (!isLoading && data?.result) {
      console.log(data.result);
      userInput = {
        name: data.result[0].pickupName,
        email: data.result[0].pickupEmail,
        phoneNumber: data.result[0].pickupPhoneNumber,
      };
      orderDetails = {
        id: data.result[0].orderId,
        cartItems: data.result[0].orderDetails,
        cartTotal: data.result[0].orderTotal,
        status: data.result[0].status,
      };
    }
    return (
      <div
        className="container my-5 mx-auto p-5 w-100"
        style={{ maxWidth: "750px" }}
      >
        {!isLoading && orderDetails && userInput && (
          <OrderSummary data={orderDetails} userInput={userInput} />
        )}
      </div>
    );
};

export default OrderDetails;