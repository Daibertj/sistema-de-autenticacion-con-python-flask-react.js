import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

const Private = () => {
  const { store } = useContext(Context);

  if (!store.token) {
    return <div>Debes hacer loggin para acceder a la pagina :/ </div>;
  }
  return (
    <div className="container">
      <div className="justify-content-center">
        <h1>Vista privada</h1>
        <h2>Solo para usuarios que han hecho loggin</h2>
      </div>
    </div>
  );
};

export default Private;
