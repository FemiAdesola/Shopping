import React from 'react';

import { adminAuth} from "../../HOC";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import OrderList from "./OrderList";
import { MainLoader } from "../../Components/common";

const AllOrders = () => {
   const { data, isLoading } = useGetAllOrdersQuery(null);
//    console.log(data.result);
   return (
     <>
       {isLoading && <MainLoader />}
       {!isLoading && (
         <OrderList isLoading={isLoading} orderData={data.result} />
       )}
     </>
   );
};

export default adminAuth(AllOrders);