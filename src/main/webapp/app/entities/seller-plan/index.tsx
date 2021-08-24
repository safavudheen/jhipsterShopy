import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SellerPlan from './seller-plan';
import SellerPlanDetail from './seller-plan-detail';
import SellerPlanUpdate from './seller-plan-update';
import SellerPlanDeleteDialog from './seller-plan-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SellerPlanUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SellerPlanUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SellerPlanDetail} />
      <ErrorBoundaryRoute path={match.url} component={SellerPlan} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SellerPlanDeleteDialog} />
  </>
);

export default Routes;
