import React from 'react';
import { Switch } from 'react-router-dom';
import { useAppSelector } from 'app/config/store';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import { AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import SellerPlan from './seller-plan';
import Seller from './seller';
import Contact from './contact';
import Category from './category';
import Product from './product';
import Service from './service';
import UserVisit from './user-visit';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const account = useAppSelector(state => state.authentication.account);
const isAdmin = hasAnyAuthority(account.authorities, [AUTHORITIES.ADMIN]);

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}seller-plan`} component={SellerPlan} />
      <ErrorBoundaryRoute path={`${match.url}seller`} component={Seller} />
      <ErrorBoundaryRoute path={`${match.url}contact`} component={Contact} />
      {isAdmin ? <ErrorBoundaryRoute path={`${match.url}category`} component={Category} /> : null}
      <ErrorBoundaryRoute path={`${match.url}product`} component={Product} />
      <ErrorBoundaryRoute path={`${match.url}service`} component={Service} />
      <ErrorBoundaryRoute path={`${match.url}user-visit`} component={UserVisit} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
