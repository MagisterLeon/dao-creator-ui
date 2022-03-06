import { Route, Switch } from 'react-router-dom';
import React, { ReactElement } from 'react';

import Clubs from 'views/clubs/clubs.view';
import Home from 'views/home/home.view';
import LayoutDefault from 'layouts/default/default.layout';

import { ROOT_ROUTES } from './routes';

const RootRoutes = (): ReactElement => (
  <Switch>
    <LayoutDefault>
      <Route
        exact
        path={ROOT_ROUTES.home}
        render={() => (
          <Home/>
        )}
      />
      <Route
        exact
        path={ROOT_ROUTES.clubs}
        render={() => (
          <Clubs/>
        )}
      />
    </LayoutDefault>

  </Switch>
);

export default RootRoutes;
