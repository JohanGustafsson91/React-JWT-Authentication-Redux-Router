import React from 'react';
import ReactDOM from 'react-dom';
import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import routes from './routes';
import Root from './containers/Root';
import configureStore from './redux/configureStore';
import {validateUserToken} from './redux/actions/authentication';

const historyConfig = { basename: __BASENAME__ };
const history = useRouterHistory(createHistory)(historyConfig);

const initialState = window.__INITIAL_STATE__;
const store = configureStore({ initialState, history });

/**
 * Check if token is set and validate it
 */
let token = localStorage.getItem('token');
if (token !== null) {
    store.dispatch(validateUserToken(token, '/login'));
}

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
);
