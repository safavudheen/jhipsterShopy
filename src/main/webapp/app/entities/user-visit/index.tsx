import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserVisit from './user-visit';
import UserVisitDetail from './user-visit-detail';
import UserVisitUpdate from './user-visit-update';
import UserVisitDeleteDialog from './user-visit-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserVisitUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserVisitUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserVisitDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserVisit} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UserVisitDeleteDialog} />
  </>
);

export default Routes;
