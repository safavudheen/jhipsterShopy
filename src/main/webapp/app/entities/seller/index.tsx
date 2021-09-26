import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Seller from './seller';
import SellerDetail from './seller-detail';
import SellerUpdate from './seller-update';
import SellerDeleteDialog from './seller-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SellerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SellerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SellerDetail} />
      <ErrorBoundaryRoute path={match.url} component={Seller} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SellerDeleteDialog} />
  </>
);

export default Routes;
