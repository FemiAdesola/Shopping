import React, {useState} from 'react';
import { useParams, useNavigate} from 'react-router-dom';

import { useGetProductByIdQuery } from '../../Apis/productApi';
import { useUpdateCartMutation } from '../../Apis/cartApi';
import { Loader, MainLoader } from '../common';

// UserId = 559a7266-4562-44a6-901d-5764a9949088

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductByIdQuery(productId);
  const [quantity, setQuantity] = useState(1);
  const [isAddingTocart, setIsAddingToCart] = useState<boolean>(false);
  const [updateCart] = useUpdateCartMutation();

  const handleQuantity = (counter: number) => {
    let newQuantity = counter + quantity;
    if (newQuantity == 0) {
      newQuantity = 1;
    }
    setQuantity(newQuantity)
    return;
  }
  
  const handleAddToCart = async (productId: number) => {
    setIsAddingToCart(true);
    const response = await updateCart({
      productId: productId,
      updateQuantityBy: quantity,
      userId: "559a7266-4562-44a6-901d-5764a9949088",
    });
    console.log(response);
    setIsAddingToCart(false);
  }
    


    return (
      <div className="container pt-4 pt-md-5">
        {!isLoading ? (
          <>
            <div className="row">
              <div className="col-7">
                <h2 className="text-success">{data.result?.title}</h2>
                <span>
                  <span
                    className="badge text-bg-dark pt-2"
                    style={{ height: "40px", fontSize: "20px" }}
                  >
                    {data.result?.category}
                  </span>
                </span>
                <span>
                  <span
                    className="badge text-bg-light pt-2"
                    style={{ height: "40px", fontSize: "20px" }}
                  >
                    {data.result?.productType}
                  </span>
                </span>
                <p style={{ fontSize: "20px" }} className="pt-2">
                  {data.result?.description}
                </p>
                <span className="h3">
                  € {data.result.price.toLocaleString("en")}
                </span>{" "}
                &nbsp;&nbsp;&nbsp;
                <span
                  className="pb-2  p-3"
                  style={{ border: "1px solid #333", borderRadius: "30px" }}
                >
                  <i
                    onClick={() => handleQuantity(-1)}
                    className="bi bi-dash p-1"
                    style={{ fontSize: "25px", cursor: "pointer" }}
                  ></i>
                  <span className="h3 mt-3 px-3"> {quantity}</span>
                  <i
                    onClick={() => handleQuantity(+1)}
                    className="bi bi-plus p-1"
                    style={{ fontSize: "25px", cursor: "pointer" }}
                  ></i>
                </span>
                <div className="row pt-4">
                  <div className="col-5">
                    {isAddingTocart ? (
                      <button disabled className="btn btn-success form-control">
                        <Loader />
                      </button>
                    ) : (
                      <button className="btn btn-success form-control"
                        onClick={() => handleAddToCart(data.result?.id)}>
                        Add to Cart
                      </button>
                    )}
                  </div>
                  <div className="col-5 ">
                    <button
                      className="btn btn-secondary form-control"
                      onClick={() => navigate(-1)}
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-5">
                <img
                  src={data.result?.image}
                  width="50%"
                  height="100%"
                  style={{ borderRadius: "50%" }}
                  alt="No content"
                ></img>
              </div>
            </div>
            <div
              className="d-flex justify-content-center"
              style={{ width: "100%" }}
            ></div>
          </>
        ) : (
          <div
            className="d-flex justify-content-center"
            style={{ width: "100%" }}
          >
              <div>
                <MainLoader/>
            </div>
          </div>
        )}
      </div>
    );
};

export default ProductDetails;