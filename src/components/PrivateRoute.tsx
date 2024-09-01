import React from "react";
import { Route, Redirect } from "react-router-dom";

interface PrivateRouteProps {
  path: string;
  children: JSX.Element;
  isAuthenticated: boolean;
  redirectPath: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  children,
  isAuthenticated,
  redirectPath,
}) => {
  return (
    <Route
      path={path}
      render={() =>
        isAuthenticated ? children : <Redirect to={redirectPath} />
      }
    />
  );
};

export default PrivateRoute;
