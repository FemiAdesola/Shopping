import React from 'react';
import { useLocation } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from './PaymentForm';
import { OrderSummary } from '../order';


const Payment = () => {
     const {
       state: { apiResult, userInput },
     } = useLocation();
    
    const stripePromise = loadStripe("pk_test_51NdpHQIr7XllsuUYysMaFKZipEkA30OqJ7ndBdMq3oyGvDto3CGFe9LwQKmR2Gm13CQXTfZ6dKBTyEefAFaI7TyY008bBMD2Vo");
    const options = {
      // passing the client secret obtained from the server
      clientSecret: apiResult.clientSecret,
    };

    return (
      <Elements stripe={stripePromise} options={options}>
        <div className="container m-5 p-5">
          <div className="row">
            <div className="col-md-7">
              <OrderSummary data={apiResult} userInput={userInput} />
            </div>
            <div className="col-md-4 offset-md-1">
              <h3 className="text-success">Payment</h3>
              <div className="mt-5">
                <PaymentForm data={apiResult} userInput={userInput} />
              </div>
            </div>
          </div>
        </div>
      </Elements>
    );
};

export default Payment;