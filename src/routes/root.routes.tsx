import { Route, Switch } from 'react-router-dom';
import React, { ReactElement } from 'react';

import ClubCreate from 'views/clubs/create/club-create.view';
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
          <ClubCreate/>
        )}
      />
    </LayoutDefault>

  </Switch>
);

export default RootRoutes;
