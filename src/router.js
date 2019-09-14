import React from 'react';
import { Route, Switch } from 'react-router-dom';

// screens
import { LoginScreen } from './screens/Login';
import { NotFoundScreen } from './screens/NotFound';

const Router = () => (
  <Switch>
    <Route path="/" exact component={LoginScreen} />
    <Route path="*" exact component={NotFoundScreen} />
  </Switch>
);

export default Router;