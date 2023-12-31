import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { toastNotification } from '../Helper';
import { CartItemsType, apiResponse, orderSummaryType } from '../../types';
import { useCreateOrderMutation } from '../../Apis/orderApi';
import { PaymentStatus } from '../../Utils/StaticDetails';
import { OrderDetailsDTO } from '../../types/order';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ data, userInput }: orderSummaryType) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [createOrder] = useCreateOrderMutation();

   console.log(data);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (result.error) {
      toastNotification("An unexpected error occured.", "error");
      setIsProcessing(false);
    } else {
      console.log(result);
      let grandTotal = 0;
      let totalItems = 0;

      const orderDetailsDTO: OrderDetailsDTO[] = [];

      data.cartItems?.forEach((item: CartItemsType) => {
        const tempOrderDetail: any = {};
        tempOrderDetail["productId"] = item.product?.id;
        tempOrderDetail["quantity"] = item.quantity;
        tempOrderDetail["itemName"] = item.product?.title;
        tempOrderDetail["price"] = item.product?.price;
        orderDetailsDTO.push(tempOrderDetail);
        grandTotal += item.quantity! * item.product?.price!;
        totalItems += item.quantity!;
      });
      const response: apiResponse = await createOrder({
        pickupName: userInput.name,
        pickupPhoneNumber: userInput.phoneNumber,
        pickupEmail: userInput.email,
        totalItems: totalItems,
        orderTotal: grandTotal,
        orderDetailsDTO: orderDetailsDTO,
        stripePaymentIntentID: data.stripePaymentIntentId,
        appUserId: data.userId,
        status:
          result.paymentIntent.status === "succeeded"
            ? PaymentStatus.CONFIRMED
            : PaymentStatus.PENDING,
      });

      if (response) {
        if (response.data?.result.status === PaymentStatus.CONFIRMED) {
          navigate(
            `/order/orderconfirmed/${response.data.result.orderId}`
          );
        } else {
          navigate("/failed");
        }
      }
    }
    setIsProcessing(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        disabled={!stripe || isProcessing}
        className="btn btn-success mt-5 w-100"
      >
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Submit Order"}
        </span>
      </button>
    </form>
  );
};

export default PaymentForm;

