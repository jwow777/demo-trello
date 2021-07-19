import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const store = useContext(AppContext);
  return (
    <Route>
      { () => store.loggedIn ? <Component {...props} /> : <Redirect to='./sign-in' /> }
    </Route>
  );
};

export default ProtectedRoute; 