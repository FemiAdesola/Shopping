import React, { useEffect, useState } from "react";

import { adminAuth } from "../../HOC";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import OrderList from "./OrderList";
import { MainLoader } from "../../Components/common";
import { inputHelper } from "../Helper";
import { PaymentStatus } from "../../Utils/StaticDetails";
import { OrderType } from "../../types";

const filterOptions = [
  "All",
  PaymentStatus.CONFIRMED,
  PaymentStatus.BEING_COOKED,
  PaymentStatus.READY_FOR_PICKUP,
  PaymentStatus.CANCELLED,
  PaymentStatus.PENDING,
];

const AllOrders = () => {
  const [filters, setFilters] = useState({ searchString: "", status: "" });
  const [apiFilters, setApiFilters] = useState({
    searchString: "",
    status: "",
  });
  // about page
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 5,
  });
  //
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize); // for dropdown page
  const { data, isLoading } = useGetAllOrdersQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      status: apiFilters.status,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize,
    }),
  });

  const [orderData, setOrderData] = useState([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const inputValue = inputHelper(e, filters);
    setFilters(inputValue);
  };
  const handleFilters = () => {
    //for locsl filer
    // const itemData = data.result.filter((orderData: OrderType) => {
    //   if ((orderData.pickupName && orderData.pickupName.includes(filters.searchString))
    //     || (orderData.pickupEmail && orderData.pickupEmail.includes(filters.searchString))
    //     || (orderData.pickupPhoneNumber && orderData.pickupPhoneNumber.includes(filters.searchString))
    //   ) {
    //     return orderData;
    //   }
    // });
    // const finalArray = itemData.filter((orderData: OrderType) =>
    //   filters.status !== "" ? orderData.status === filters.status : orderData
    // );

    // setOrderData(finalArray);

    // Api filter
    setApiFilters({
      searchString: filters.searchString,
      status: filters.status,
    });
  };

  useEffect(() => {
    if (data) {
      setOrderData(data.apiResponse.result);
      const { TotalRecords } = JSON.parse(data.totalRecords);
      setTotalRecords(TotalRecords);
    }
  }, [data]);

  // pagination
  const getPageDetails = () => {
    const dataStartNumber =
      (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
    const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize;

    return `${dataStartNumber}
             - 
            ${
              dataEndNumber < totalRecords ? dataEndNumber : totalRecords
            } of ${totalRecords}`;
  };

  const handlePageOptionChange = (direction: string, pageSize?: number) => {
    if (direction === "prev") {
      setPageOptions({ pageSize: 5, pageNumber: pageOptions.pageNumber - 1 });
    } else if (direction === "next") {
      setPageOptions({ pageSize: 5, pageNumber: pageOptions.pageNumber + 1 });
    }
    // for dropdown page option change
    else if (direction === "change") {
      setPageOptions({
        pageSize: pageSize ? pageSize : 5,
        pageNumber: 1,
      });
    }
    //
  };

  const handleDropDownPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handlePageOptionChange("change", Number(event.target.value));
    setCurrentPageSize(Number(event.target.value));
  };

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
          <div className="d-flex mx-5 justify-content-end align-items-center">
            <div>Rows per page: </div>
            <div>
              <select
                className="form-select mx-2"
                onChange={handleDropDownPage}
                style={{ width: "80px" }}
                value={currentPageSize}
              >
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
              </select>
            </div>
            <div className="mx-2">{getPageDetails()}</div>
            <button
              onClick={() => handlePageOptionChange("prev")}
              disabled={pageOptions.pageNumber === 1}
              className="btn btn-outline-primary px-3 mx-2"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              onClick={() => handlePageOptionChange("next")}
              disabled={
                pageOptions.pageNumber * pageOptions.pageSize >= totalRecords
              }
              className="btn btn-outline-primary px-3 mx-2"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default adminAuth(AllOrders);
