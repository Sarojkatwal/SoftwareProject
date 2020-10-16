import React from "react";
import { Route } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, obj, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (sessionStorage.getItem(obj.key) === obj.value) {
          return <Component {...props} />;
        } else {
          alert("Cannot perform this action");
          props.history.goBack();
        }
      }}
    />
  );
};
