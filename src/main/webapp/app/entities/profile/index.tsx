import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import ProfileSellerDetail from './profile-seller-details';
import ProfileSellerUpdate from './profile-seller-edit';
import PackagePlan1 from './package-plans/package-plan1';
import PackagePlan2 from './package-plans/package-plan2';
import PackagePlan3 from './package-plans/package-plan3';
import PackagePlan4 from './package-plans/package-plan4';
const Routes = ({ match }) => (
  <>
    <Switch>
      {/* <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfileSellerUpdate} /> */}
      <ErrorBoundaryRoute path={`${match.url}/edit`} component={ProfileSellerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}`} component={ProfileSellerDetail} />
      <ErrorBoundaryRoute path={`${match.url}/plan1`} component={PackagePlan1} />
      <ErrorBoundaryRoute path={`${match.url}/plan2`} component={PackagePlan2} />
      <ErrorBoundaryRoute path={`${match.url}/plan3`} component={PackagePlan3} />
      <ErrorBoundaryRoute path={`${match.url}/plan4`} component={PackagePlan4} />
    </Switch>
  </>
);
export default Routes;
