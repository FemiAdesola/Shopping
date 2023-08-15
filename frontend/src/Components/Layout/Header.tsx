import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../Redux/store';
import { CartItemsType } from '../../types';
let logo = require("../../Assets/Images/computer.png");

const Header = () => {
   const cartFromStore: CartItemsType[] = useSelector(
    (state: RootState) => state.cartStore.cartItems ?? []
   );
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
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/cart">
                    <i className="bi bi-cart text-success"> {" "}
                      {cartFromStore?.length ?
                        `(${cartFromStore.length})` : ""}
                    </i>
                  </NavLink>
                </li>
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
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
};

export default Header;