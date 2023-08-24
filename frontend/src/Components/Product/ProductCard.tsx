import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { ProductType, apiResponse, userType } from '../../types';
import { useUpdateCartMutation } from '../../Apis/cartApi';
import { Loader } from '../common';
import { toastNotification } from '../Helper';
import { RootState } from '../../Redux/store';

interface Props {
  product: ProductType;
}

const ProductCard = (props: Props) => {
  const navigate = useNavigate();
  const [isAddingTocart, setIsAddingToCart] = useState<boolean>(false);
  const [updateCart] = useUpdateCartMutation();

  const userData : userType = useSelector((state: RootState) => state.userStore);

  const handleAddToCart = async (productId: number) => {
    if (!userData.id) {
      navigate("/login");
      return;
    }
    setIsAddingToCart(true);
    const response: apiResponse = await updateCart({
      productId: productId,
      updateQuantityBy: 1,
      userId: userData.id,
    });
    if (response.data && response.data.isSuccess) {
      toastNotification("Item added to cart successfully!");
    }
    setIsAddingToCart(false);
  };
    return (
      <div className=" productcard col-md-4 col-12 pt-4 ">
        <div
          className="card"
          style={{ boxShadow: "0 1px 1px 0 rgb(0 0 0 / 30%" }}
        >
          <div className="card-body pt-3">
            <div className="row col-10 offset-1 p-3 image ">
              <Link to={`/productDetails/${props.product.id}`}>
                <img
                  src={props.product.image}
                  className="w-100% mt-5 image-fluid"
                  alt={props.product.title}
                  width="100 % "
                  height="100%"
                />
              </Link>
            </div>
            {props.product.productType &&
              props.product.productType.length > 0 && (
                <i
                  className="bi bi-star btn btn-success"
                  style={{
                    position: "absolute",
                    top: "15px",
                    left: "15px",
                    width: "50%",
                    padding: "5px 10px",
                    borderRadius: "3px",
                    outline: "none !important",
                    cursor: "pointer",
                  }}
                >
                  &nbsp; {props.product.productType}
                </i>
              )}
            {isAddingTocart ? (
              <div
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                }}
              >
                <Loader />
              </div>
            ) : (
              <i
                className="bi bi-cart-plus btn btn-outline-danger"
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  padding: "5px 10px",
                  borderRadius: "3px",
                  outline: "none !important",
                  cursor: "pointer",
                }}
                onClick={() => handleAddToCart(props.product.id)}
              ></i>
            )}

            <div className="text-center">
              <p className="card-title m-0 text-success fs-3">
                <Link
                  to={`/productDetails/${props.product.id}`}
                  style={{
                    textDecoration: "none",
                    color: "gray",
                    fontSize: "20px",
                  }}
                >
                  {props.product.title}
                </Link>
              </p>
              <p className="badge bg-secondary" style={{ fontSize: "15px" }}>
                {props.product.category}
              </p>
            </div>
            <div className="row text-center">
              <h5 style={{ fontSize: "15px" }}>
                €{props.product.price.toLocaleString("en")}
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProductCard;