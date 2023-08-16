import React from 'react';

const Register = () => {
    return (
      <div className="container text-center">
        <form method="post">
          <h1 className="mt-5">Register</h1>
          <div className="mt-5">
            <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                required
                name="userName"
              />
            </div>
            <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                required
                name="name"
              />
            </div>
            <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                required
                name="password"
              />
            </div>
            <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
              <select
                className="form-control form-select"
                required
                name="role"
              >
                <option value="">--Select Role--</option>
                <option >Customer</option>
                <option >Admin</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="btn btn-success"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    );
};

export default Register;