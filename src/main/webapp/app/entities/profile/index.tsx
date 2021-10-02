import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import ProfileSellerDetail from './profile-seller-details';
import ProfileSellerUpdate from './profile-seller-edit';
const Routes = ({ match }) => (
  <>
    <Switch>
      {/* <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfileSellerUpdate} /> */}
      <ErrorBoundaryRoute exact path={`${match.url}/edit`} component={ProfileSellerUpdate} />
      <ErrorBoundaryRoute path={`${match.url}`} component={ProfileSellerDetail} />
    </Switch>
  </>
);
export default Routes;
