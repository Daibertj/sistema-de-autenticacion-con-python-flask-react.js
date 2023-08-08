import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const { actions } = useContext(Context);
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();

  const handleLogin = async () => {
    let response = await actions.login(user);
    if (response == 200) {
      if (response == 400) {
        Swal.fire({
          title: "Error!",
          text: "Not found",
          icon: "warning",
          confirmButtonText: "Cool",
        });
        await actions.getUserData;
        navigate(`/private`);
      }
    }
  };

  const handleChange = ({ target }) => {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center ">
        <form>
          <div className="form-group d-grid gap-2 col-6  mx-auto ">
            <div className="row g-4 justify-content-center">
              <div className="col-2">
                <label className="col-form-label" htmlFor="email">
                  Email:
                </label>
              </div>
              <div className="col-auto">
                <input
                  className="form-control"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  id="email"
                  name="email"
                />
              </div>
            </div>
            <div className="row g-4 justify-content-center">
              <div className="col-2">
                <label>Password:</label>
              </div>
              <div className="col-auto">
                <input
                  className="form-control"
                  type="password"
                  value={user.password}
                  onChange={handleChange}
                  name="password"
                  id="password"
                />
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 col-6  mx-auto p-2">
            <button
              type="button"
              className="btn btn-primary w-75 mx-auto"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center">
          No tienes una cuenta? <Link to="/singup">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
