import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Convert from './pages/Convert';
import History from './pages/History';
import NotFound from './components/layout/NotFound';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Convert} />
    <Route exact path="/history" component={History} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
