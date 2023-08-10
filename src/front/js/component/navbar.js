import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <span className="navbar-brand mb-0 h1">Auth Python Flask React</span>
        <div className="ml-auto">
          {store.token ? (
            <button
              className="btn btn-danger"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <div>
              <Link to={"/login"}>
                <button className="btn btn-primary">Login</button>
              </Link>
              <Link to={"/signup"}>
                <button className="btn btn-primary ms-1">Signup</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
