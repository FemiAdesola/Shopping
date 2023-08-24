import React, { useEffect, useState } from 'react';

import { adminAuth} from "../../HOC";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import OrderList from "./OrderList";
import { MainLoader } from "../../Components/common";
import { inputHelper } from '../Helper';
import { PaymentStatus } from '../../Utils/StaticDetails';
import { OrderType } from '../../types';

const filterOptions = [
  "All",
  PaymentStatus.CONFIRMED,
  PaymentStatus.BEING_COOKED,
  PaymentStatus.READY_FOR_PICKUP,
  PaymentStatus.CANCELLED,
  PaymentStatus.PENDING,
];

const AllOrders = () => {
  const { data, isLoading } = useGetAllOrdersQuery("");
  const [filters, setFilters] = useState({ searchString: "", status: "" });
//    console.log(data.result);
  const [orderData, setOrderData] = useState([]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const inputValue = inputHelper(e, filters);
    setFilters(inputValue);
  };
  const handleFilters = () => {
    const itemData = data.result.filter((orderData: OrderType) => {
      if ((orderData.pickupName && orderData.pickupName.includes(filters.searchString))
        || (orderData.pickupEmail && orderData.pickupEmail.includes(filters.searchString))
        || (orderData.pickupPhoneNumber && orderData.pickupPhoneNumber.includes(filters.searchString))
      ) {
        return orderData;
      }
    });
    const finalArray = itemData.filter((orderData: OrderType) =>
      filters.status !== "" ? orderData.status === filters.status : orderData
    );

    setOrderData(finalArray);
  };
  
   useEffect(() => {
     if (data) {
       setOrderData(data.result);
     }
   }, [data]);
  
   return (
     <>
       {isLoading && <MainLoader />}
       {!isLoading && (
         <>
           <div className="d-flex align-items-center justify-content-between mx-5 mt-5">
             <h1 className="text-success">Orders List</h1>
             <div className="d-flex" style={{ width: "40%" }}>
               <input
                 type="text"
                 className="form-control mx-2"
                 placeholder="Search Name, Email or Phone"
                 name="searchString"
                  onChange={handleChange}
               />
               <select
                className="form-select w-50 mx-2"
                onChange={handleChange}
                name="status"
               >
                 {filterOptions.map((item, index) => (
                   <option key={index} value={item === "All" ? "" : item}>
                     {item}
                   </option>
                 ))}
                 <option>All</option>
               </select>
               <button
                 className="btn btn-outline-success"
                 onClick={handleFilters}
               >
                 Filter
               </button>
             </div>
           </div>
           <OrderList isLoading={isLoading} orderData={orderData} />
         </>
       )}
     </>
   );
};

export default adminAuth(AllOrders);