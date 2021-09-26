import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SellerPlan from './seller-plan';
import Seller from './seller';
import Contact from './contact';
import Category from './category';
import Product from './product';
import Service from './service';
import UserVisit from './user-visit';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}seller-plan`} component={SellerPlan} />
      <ErrorBoundaryRoute path={`${match.url}seller`} component={Seller} />
      <ErrorBoundaryRoute path={`${match.url}contact`} component={Contact} />
      <ErrorBoundaryRoute path={`${match.url}category`} component={Category} />
      <ErrorBoundaryRoute path={`${match.url}product`} component={Product} />
      <ErrorBoundaryRoute path={`${match.url}service`} component={Service} />
      <ErrorBoundaryRoute path={`${match.url}user-visit`} component={UserVisit} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
