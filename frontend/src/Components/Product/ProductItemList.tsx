import React, { useEffect, useState } from 'react';
import { useDeleteProductMutation, useGetProductsQuery } from '../../Apis/productApi';
import { MainLoader } from '../common';
import { ProductType } from '../../types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductItemList = () => {
  const [deleteProduct] = useDeleteProductMutation();

  const handleProductItemDelete = async (id: number) => {
    toast.promise(
      deleteProduct(id),
      {
        pending: "Processing your request...",
        success: "Product Item Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "light",
      }
    );
  };

  const [totalRecords, setTotalRecords] = useState(0);
  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 5,
  });
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize); // for dropdown page
  const { data, isLoading } = useGetProductsQuery({
    pageNumber: pageOptions.pageNumber,
    pageSize: pageOptions.pageSize,
  });
  const handleDropDownPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handlePageOptionChange("change", Number(event.target.value));
    setCurrentPageSize(Number(event.target.value));
  };
  //
  useEffect(() => {
    if (!isLoading) {
      if (data && data.apiResponse.result) {
        const { TotalRecords } = JSON.parse(data.totalRecords);
        setTotalRecords(TotalRecords);
      }
    }
  }, [isLoading]);

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
  //

  const navigate = useNavigate();
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <h5 className="text-success">Total products: {totalRecords}</h5>
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">Product Item List</h1>
            <button
              className="btn btn-success"
              onClick={() => navigate("/product/productupsert")}
            >
              Add New product Item
            </button>
          </div>
          <div className="p-2">
            <div className="row border">
              <div className="col-1">Image</div>
              <div className="col-1">ID</div>
              <div className="col-2">Name</div>
              <div className="col-2">Category</div>
              <div className="col-1">Price</div>
              <div className="col-2">Product Type</div>
              <div className="col-1">Action</div>
            </div>
            {data?.apiResponse.result.map((product: ProductType) => {
              return (
                <div className="row border" key={product.id}>
                  <div className="col-1">
                    <img
                      src={product.image}
                      alt="no content"
                      style={{
                        width: "50%",
                        maxWidth: "120px",
                        height: "50px",
                      }}
                    />
                  </div>
                  <div className="col-1">{product.id}</div>
                  <div className="col-2">{product.title}</div>
                  <div className="col-2">{product.category}</div>
                  <div className="col-1">€{product.price}</div>
                  <div className="col-2">{product.productType}</div>
                  <div className="col-1">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/product/productupsert/" + product.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleProductItemDelete(product.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/*  */}
      <div className="d-flex mx-5 mt-4 justify-content-end align-items-center">
        <div>Rows per page: </div>
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
  );
};

export default ProductItemList;