import { Route, Switch } from 'react-router-dom';
import React, { ReactElement } from 'react';

import Home from 'views/home/home.view';
import LayoutOnboarded from 'layouts/layout-onboarded/layout-onboarded.layout';

import { ROOT_ROUTES } from './routes';

const RootRoutes = (): ReactElement => (
  <Switch>
    <Route
      exact
      path={ROOT_ROUTES.home}
      render={() => (
        <LayoutOnboarded>
          <Home />
        </LayoutOnboarded>
      )}
    />
  </Switch>
);

export default RootRoutes;
