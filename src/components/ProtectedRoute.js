// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ element: Component, ...props }) => {
//   return props.isLoggedIn ? <Component {...props} /> : <Navigate to="/" />;
// };

// export default ProtectedRoute;


import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.loggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
  );
};

export default ProtectedRoute;