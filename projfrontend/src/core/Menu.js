import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as GoIcons from "react-icons/go";




const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => {
  return (
    <div className="menu">
      <ul className="nav nav-tabs bg-dark ">
        <li className="nav-item ">
          <Link style={currentTab(history, "/")} className="nav-link" to="/">
            <AiIcons.AiFillHome className="mr-2 mb-1"/>
            Home
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/user/dashboard")}
                className="nav-link"
                to="/user/dashboard"
              >
               <GoIcons.GoDashboard className="mr-2 mb-1"/>
                U.Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link"
                to="/user/cart"
              >
                <FaIcons.FaShoppingCart className="mr-2"/>
                Cart
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/admin/dashboard")}
                className="nav-link"
                to="/admin/dashboard"
              >
                <RiIcons.RiAdminFill className="mr-2 "/>
                A. Dashboard
              </Link>
            </li>
          </Fragment>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signin")}
                className="nav-link"
                to="/signin"
              >
                <FaIcons.FaUser className="mr-1" />
                SignIn
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              style={{ cursor: "pointer" }}
              onClick={() => {
                signout(() => {
                  history.push("/signin");
                });
              }}
            >
              <FaIcons.FaSignOutAlt className="mr-2" />
              Signout
            </span>
          </li>
        )}
        <div className="d-flex float-right rounded m-1">
        <input className="form-control p-1" type="search" placeholder="Search..." aria-label="Search"/>
        <button className="btn btn-outline-success btn-sm p-2 ml-2" type="submit"><BsIcons.BsSearch/></button>
        </div>
      </ul>
      
    </div>
  );
};

export default withRouter(Menu);
