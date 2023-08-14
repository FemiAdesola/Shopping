import React from 'react';
import { ProductType } from '../../types';
import { Link } from 'react-router-dom';

interface Props {
  product: ProductType;
}

const ProductCard = (props:Props) => {
    return (
      <div className=" productcard col-md-4 col-12 pt-4 ">
        <div
          className="card"
          style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%" }}
        >
          <div className="card-body pt-2">
            <div className="row col-10 offset-1 p-4 image ">
              <Link to={`/productDetails/${props.product.id}`}>
                <img
                  src={props.product.image}
                  className="w-100% mt-5 image-fluid"
                  // style={{ borderRadius: "50%" }}
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
            ></i>
            <div className="text-center">
              <p className="card-title m-0 text-success fs-3">
                <Link
                  to={`/productDetails/${props.product.id}`}
                  style={{ textDecoration: "none", color: "gray" }}
                >
                  {props.product.title}
                </Link>
              </p>
              <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
                {props.product.category}
              </p>
            </div>
            {/* <p className="card-text" style={{ textAlign: "center" }}>
                {props.product.description}
              </p> */}
            <div className="row text-center">
              <h4>€{props.product.price.toLocaleString("en")}</h4>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProductCard;