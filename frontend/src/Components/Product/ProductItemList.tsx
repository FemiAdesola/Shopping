import React from 'react';
import { useGetProductsQuery } from '../../Apis/productApi';
import { MainLoader } from '../common';
import { ProductType } from '../../types';
import { useNavigate } from 'react-router-dom';

const ProductItemList = () => {
  const { data, isLoading } = useGetProductsQuery(null);
  const navigate = useNavigate();
    return (
      <>
        {isLoading && <MainLoader />}
        {!isLoading && (
          <div className="table p-5">
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
              {data.result.map((product: ProductType) => {
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
      </>
    );
};

export default ProductItemList;