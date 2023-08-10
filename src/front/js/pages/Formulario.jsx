import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

const initialState = {
  email: "",
  password: "",
};

const Formulario = () => {
  const [user, setUser] = useState(initialState);
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!user.email || !user.password) {
      console.log("Por favor completa todos los campos");
      return;
    }

    try {
      const response = await actions.registerUser(user);
      if (response === 201 || 200) {
        console.log("Registro exitoso");
        navigate("/");
      }
      if (response == 400) {
        Swal.fire({
          title: "Error!",
          text: "This user already exist",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      console.log("Error en la solicitud de registro:", error);
    }
  };

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  return (
    <div className="container-fluid w-25 ">
      <h1 className="row justify-content-center py-3">Signup</h1>
      <form>
        <div className="mb-3 row   ">
          <label className="col-sm-2 col-form-label">Email:</label>
          <input
            className="form-control"
            type="email"
            value={user.email}
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 row   ">
          <label className="col-sm-2 col-form-label">Password:</label>
          <input
            className="form-control"
            type="password"
            value={user.password}
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="d-grid gap-2 col-3  mx-auto p-2">
          <button
            className="btn btn-primary mb-2"
            type="button"
            onClick={handleSignup}
          >
            Signup
          </button>
        </div>
      </form>
      <p>
        Ya tienes una cuenta? <Link to="/">Inicia sesión aquí</Link>
      </p>
    </div>
  );
};

export default Formulario;
