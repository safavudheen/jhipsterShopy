import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Dashboard from './dashboard';

const Routes = ({ match }) => <ErrorBoundaryRoute exact path={match.url} component={Dashboard} />;

export default Routes;
