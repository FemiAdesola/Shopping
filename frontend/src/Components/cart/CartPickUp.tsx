import React, { useState } from 'react';
import { Loader } from '../common';
import { useSelector } from 'react-redux';
import { CartItemsType } from '../../types';
import { RootState } from '../../Redux/store';
import { useNavigate } from 'react-router-dom';
import { inputHelper } from '../Helper';

const CartPickUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const cartFromStore: CartItemsType[] = useSelector(
    (state: RootState) => state.cartStore.cartItems ?? []
  );
  let grandTotal = 0;
  let totalItems = 0;
  // user details for pick up
  const initialUserData = {
    name: "",
    email: "",
    phoneNumber: "",
  };
  // for getting total item and price
  cartFromStore?.map((cartItem: CartItemsType) => {
    totalItems += cartItem.quantity ?? 0;
    grandTotal += (cartItem.product?.price ?? 0) * (cartItem.quantity ?? 0);
    return null;
  });
  //
 
  // Handle user input
  const [userInput, setUserInput] = useState(initialUserData);
  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const receiveData = inputHelper(event, userInput);
    setUserInput(receiveData);
  };
  //

  // handsubmit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  };

    return (
      <div className="border pb-5 pt-3">
        <h1 style={{ fontWeight: "300" }} className="text-center text-success">
          Pickup Details
        </h1>
        <hr />
        <form onSubmit={handleSubmit} className="col-10 mx-auto">
          <div className="form-group mt-3">
            Pickup Name
            <input
              type="text"
              value={userInput.name}
              className="form-control"
              placeholder="name..."
              name="name"
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="form-group mt-3">
            Pickup Email
            <input
              type="email"
              value={userInput.email}
              className="form-control"
              placeholder="email..."
              name="email"
              onChange={handleUserInput}
              required
            />
          </div>

          <div className="form-group mt-3">
            Pickup Phone Number
            <input
              type="number"
              value={userInput.phoneNumber}
              className="form-control"
              placeholder="phone number..."
              name="phoneNumber"
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="form-group mt-3">
            <div className="card p-3" style={{ background: "ghostwhite" }}>
              <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>
              <h5>No of items : {totalItems}</h5>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-success form-control mt-3"
            disabled={loading || cartFromStore.length == 0}
          >
            {loading ? <Loader /> : "Looks Good? Place Order!"}
          </button>
        </form>
      </div>
    );
};

export default CartPickUp;