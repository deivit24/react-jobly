import React from 'react';
import Home from './Home';
import NotFound404 from './NotFound404';
import Companies from '../Components/Companies/Companies';
import Jobs from '../Components/Jobs/Jobs';
import AuthForm from '../Components/Auth/Auth';
import CompanyDetails from '../Components/Companies/CompanyDetails';
import Profile from '../Components/Profile/Profile';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const Routes = ({ setToken }) => {
  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <AuthForm setToken={setToken} />
        </Route>
        <PrivateRoute exact path="/companies">
          <Companies />
        </PrivateRoute>
        <PrivateRoute exact path="/companies/:handle">
          <CompanyDetails />
        </PrivateRoute>
        <PrivateRoute exact path="/jobs">
          <Jobs />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </main>
  );
};

export default Routes;
