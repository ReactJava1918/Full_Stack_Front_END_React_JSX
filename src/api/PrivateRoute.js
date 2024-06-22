import React, {useContext } from "react";
import { Navigate } from 'react-router-dom';
import { UserContext } from '../auth/UserContext';


function PrivateRoute({ component: Component }) {
  
  const { user } = useContext(UserContext);
  

  if (!user) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/userLogIn" />;
  }

  // Render the provided component if authenticated
  return Component;
}

export default PrivateRoute;
