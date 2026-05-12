import React from "react";
import { getUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const ProtecedRoute = ({ children }) => {
  const user = getUser();

  return user ? children : <Navigate to={"/login"} />;
};

export default ProtecedRoute;
