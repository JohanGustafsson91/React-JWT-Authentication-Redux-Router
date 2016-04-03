/**
 * Modular ducks authentication reducer.
 *
 * Handles loginUser, logoutUser and validation of token.
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */

// Statuses
import { STATUS_LOGIN } from '../statuses/statuses';

// Actions
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';

// Helper functions and constans
import { initialState } from './initialState';
import { messages } from '../../utils/constants';
export const BASE_API_URL = 'http://localhost:9000/api';
import {
  updateAuthenticationCredentials,
  getHeaders,
  removeToken
} from './utils';

//////////////
// Reducer  //
//////////////

export function auth (state = initialState, action) {
  switch (action.type) {

    case LOGIN_USER_SUCCESS: {
      let { payload } = action;

      updateAuthenticationCredentials(payload);

      return Object.assign({}, state, {
        id: payload.user.id,
        name: payload.user.name,
        email: payload.user.email,
        role: payload.user.role,
        isAuthenticated: true
      });
    }

    case LOGIN_USER_FAILURE: {
      removeToken();

      return Object.assign({}, state, {
        id: null,
        name: null,
        email: null,
        role: null,
        isAuthenticated: false
      });
    }

    case LOGOUT_USER: {
      removeToken();

      return Object.assign({}, state, {
        id: null,
        name: null,
        email: null,
        role: null,
        isAuthenticated: false
      });
    }

    default: {
      return state;
    }
  }
}

/////////////
// Actions //
/////////////

/**
* @param  {[string]}   username
* @param  {[string]}   password
* @param  {[boolean]}  remember
* @param  {[string]}   redirect [Redirect to page after success]
* @author Johan Gustafsson <johan.gustafsson@solidio.se>
*/
export function loginUser (username, password, remember, redirect = '/') {
  return {
    API_URL: `${BASE_API_URL}/session`,
    method: 'POST',
    headers: getHeaders(),
    body: {
      email: username,
      password: password,
      remember: remember
    },
    successMessage: messages.SUCCESS.LOGIN,
    errorMessage: messages.ERROR.LOGIN,
    redirectSuccess: redirect,
    types: [ STATUS_LOGIN, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE ]
  };
}

/**
* @author Johan Gustafsson <johan.gustafsson@solidio.se>
*/
export function logoutUser () {
  return {
    API_URL: `${BASE_API_URL}/session`,
    method: 'DELETE',
    headers: getHeaders(),
    redirectSuccess: '/login',
    redirectError: '/login',
    types: [ false, LOGOUT_USER, LOGOUT_USER ]
  };
}

/**
* Refresh token on page load.
* @param  {[string]} redirect  [url after success]
* @author Johan Gustafsson <johan.gustafsson@solidio.se>
*/
export function validateUserToken (redirect = '/') {
  return {
    API_URL: `${BASE_API_URL}/session/refresh`,
    method: 'POST',
    headers: getHeaders(),
    successMessage: messages.SUCCESS.LOGIN,
    errorMessage: messages.ERROR.LOGIN,
    redirectSuccess: redirect,
    redirectError: '/login',
    types: [ STATUS_LOGIN, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE ]
  };
}
