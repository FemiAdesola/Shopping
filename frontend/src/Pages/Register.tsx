import React, { useState } from 'react';
import { Roles } from '../Utils/StaticDetails';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../Apis/userApi';
import { inputHelper } from '../Components/Helper';
import { apiResponse } from '../types';
import { Loader } from '../Components/common';

const Register = () => {
  const [registerUser] = useRegisterUserMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
    role: "",
    name: "",
  });

  const handleUserInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const receiveData = inputHelper(event, userInput);
    setUserInput(receiveData);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const response: apiResponse = await registerUser({
      userName: userInput.userName,
      password: userInput.password,
      role: userInput.role,
      name: userInput.name,
    });
    if (response.data) {
      console.log("Registeration successful! Please login to continue.");
      navigate("/login");
    } else if (response.error) {
      console.log(response.error.data.errorMessages[0], "error");
    }

    setLoading(false);
  };
  
    return (
      <div className="container text-center">
        {loading && <Loader />}
        <form method="post" onSubmit={handleSubmit}>
          <h1 className="mt-5">Register</h1>
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
                type="text"
                className="form-control"
                placeholder="Enter Name"
                required
                name="name"
                value={userInput.name}
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
            <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
              <select
                className="form-control form-select"
                required
                name="role"
                value={userInput.role}
                onChange={handleUserInput}
              >
                <option value="">--Select Role--</option>
                <option value={`${Roles.CUTOMER}`}>Customer</option>
                <option value={`${Roles.ADMIN}`}>Admin</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            <button type="submit" className="btn btn-success">
              Register
            </button>
          </div>
        </form>
      </div>
    );
};

export default Register;