import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";


import { inputHelper } from '../Components/Helper';
import { useLoginUserMutation } from '../Apis/userApi';
import { Loader } from '../Components/common';
import { apiResponse, userType } from '../types';
import { setLoggedInUser } from '../Redux/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loginUser] = useLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });

  const handleUserInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const receiveData = inputHelper(event, userInput);
    setUserInput(receiveData);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const response: apiResponse = await loginUser({
      userName: userInput.userName,
      password: userInput.password,
    });
    if (response.data) {
      const { token } = response.data.result;
      const { fullName, id, email, role }: userType = jwt_decode(token); // for decoded token
      localStorage.setItem("token", token);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
      navigate("/");
    } else if (response.error) {
      console.log(response.error.data.errorMessages[0], "error");
       setError(response.error.data.errorMessages[0]);
    }
    setLoading(false);
  };
    return (
      <div className="container text-center">
        {loading && <Loader />}
        <form method="post" onSubmit={handleSubmit}>
          <h1 className="mt-5">Login</h1>
          <div className="mt-5">
            <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                required
                name="userName"
                value={userInput.userName}
                onChange={handleUserInput}
              />
            </div>

            <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                required
                name="password"
                value={userInput.password}
                onChange={handleUserInput}
              />
            </div>
          </div>

          <div className="mt-2">
            {error && <p className="text-danger">{error}</p>}
            <button
              type="submit"
              className="btn btn-success"
              style={{ width: "200px" }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
};

export default Login;