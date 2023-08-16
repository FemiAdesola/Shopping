import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { RootState } from '../../Redux/store';
import { CartItemsType, userType } from '../../types';
import { initialUserStateData, setLoggedInUser } from '../../Redux/userSlice';
let logo = require("../../Assets/Images/computer.png");

const Header = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const cartFromStore: CartItemsType[] = useSelector(
    (state: RootState) => state.cartStore.cartItems ?? []
   );

    const userData: userType = useSelector(
      (state: RootState) => state.userStore
    );
  
   const handleLogout = () => {
     localStorage.removeItem("token");
     dispatch(setLoggedInUser({ ...initialUserStateData }));
     navigate("/");
   };
  
    return (
      <div>
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
          <div className="container-fluid">
            <img
              src={logo}
              alt=""
              style={{ height: "35px", verticalAlign: "top" }}
            />
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/cart">
                    <i className="bi bi-cart text-success">
                      {" "}
                      {userData.id &&  `(${cartFromStore.length})`}
                    </i>
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/authentication"
                  >
                    Authentication
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/authorization"
                  >
                    Admin
                  </NavLink>
                </li> */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Admin Panel
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
                <div className="d-flex" style={{ marginLeft: "auto" }}>
                  {userData.id && (
                    <>
                      <li className="nav-item">
                        <button
                          className="nav-link active"
                          style={{
                            cursor: "pointer",
                            background: "transparent",
                            border: 0,
                          }}
                        >
                          Hello, {userData.fullName}
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                          style={{
                            border: "none",
                            height: "40px",
                            width: "100px",
                          }}
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  )}
                  {!userData.id && (
                    <>
                      <li className="nav-item text-white">
                        <NavLink className="nav-link" to="/register">
                          Register
                        </NavLink>
                      </li>
                      <li className="nav-item text-white">
                        <NavLink
                          className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                          style={{
                            border: "none",
                            height: "40px",
                            width: "100px",
                          }}
                          to="/login"
                        >
                          Login
                        </NavLink>
                      </li>
                    </>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
};

export default Header;