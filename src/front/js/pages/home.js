import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Private from "../component/Private.jsx";
import Login from "../component/Login.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      {store.token ? <Private /> : <Login />}
    </div>
  );
};
