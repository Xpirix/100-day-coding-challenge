import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface PublicRouteProps {
  component: React.ComponentType;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component }) => {
  const authContext = useContext(AuthContext);

  if (authContext?.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default PublicRoute;