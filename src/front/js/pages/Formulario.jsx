import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

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
      } else {
        console.log("Error en el registro");
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
      <h1>Registro</h1>
      <form>
        <div className="mb-3 row   ">
          <label className="col-sm-2 col-form-label">Email:</label>
          <input
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
            type="password"
            value={user.password}
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleSignup}>
          Signup
        </button>
      </form>
      <p>
        Ya tienes una cuenta? <Link to="/">Inicia sesión aquí</Link>
      </p>
    </div>
  );
};

export default Formulario;
