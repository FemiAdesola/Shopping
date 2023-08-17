import React from 'react';
import { useLocation } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from './PaymentForm';


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
        <PaymentForm />
      </Elements>
    );
};

export default Payment;