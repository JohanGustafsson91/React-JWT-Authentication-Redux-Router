import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from '../containers/App';
import HomeView from 'views/HomeView';
import LoginView from 'views/LoginView';
import ProfileView from 'views/ProfileView';
import { requireAuthentication } from '../components/AuthenticatedComponent';
import NotFoundView from 'views/NotFoundView';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomeView} />
    <Route path='/login' component={LoginView} />
    <Route path='/profile' component={requireAuthentication(ProfileView)} />
    <Route path='/404' component={NotFoundView} />
    <Redirect from='*' to='/404' />
  </Route>
);
