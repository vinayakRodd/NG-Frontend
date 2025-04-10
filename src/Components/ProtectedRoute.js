// src/components/ProtectedRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('authToken');
  
  const isTokenValid = () => {
    if (!token) return false;
    
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;  // Current time in seconds
    
    return decodedToken.exp > currentTime;  // Token is valid if the expiration time is in the future
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        token && isTokenValid() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/sign-up" />  // Redirect to sign-up page if token is invalid or expired
        )
      }
    />
  );
};

export default ProtectedRoute;
