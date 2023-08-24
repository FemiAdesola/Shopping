import React from 'react';

import { userAuth } from '../../HOC';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import OrderList from './OrderList';
import { MainLoader } from '../../Components/common';


const UserOrders = () => {
  const userId = useSelector((state: RootState) => state.userStore.id);
  const { data, isLoading } = useGetAllOrdersQuery(userId);
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="d-flex align-items-center justify-content-between mx-5 mt-5">
            <h1 className="text-success">User Order Lists</h1>
          </div>
          <OrderList isLoading={isLoading} orderData={data.result} />
        </>
      )}
    </>
  );
};

export default userAuth(UserOrders);