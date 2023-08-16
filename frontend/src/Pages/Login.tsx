import React from 'react';

const Login = () => {
    return (
      <div className="container text-center">
        {/* {loading && <MainLoader />} */}
        <form method="post">
          <h1 className="mt-5">Login</h1>
          <div className="mt-5">
            <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                required
                name="userName"
                // value={userInput.userName}
                // onChange={handleUserInput}
              />
            </div>

            <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                required
                name="password"
                // value={userInput.password}
                // onChange={handleUserInput}
              />
            </div>
          </div>

          <div className="mt-2">
            {/* {error && <p className="text-danger">{error}</p>} */}
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