import React from 'react';

import { userAuth } from '../../HOC';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import OrderList from './OrderList';
import { Loader } from '../../Components/common';


const UserOrders = () => {
  const userId = useSelector((state: RootState) => state.userStore.id);
  const { data, isLoading } = useGetAllOrdersQuery(userId);
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && <OrderList isLoading={isLoading} orderData={data.result} />}
    </>
  );
};

export default userAuth(UserOrders);