/**
* Authentication actions
*
*/

import { routeActions } from 'react-router-redux';
import { checkHttpStatus } from '../utils';

// Fetch compability for all browsers
import fetch from 'isomorphic-fetch';
import 'es6-promise';

// Constants
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const AUTHORIZE_USER_REQUEST = 'AUTHORIZE_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const UNAUTHORIZED_USER_FAILURE = 'UNAUTHORIZED_USER_FAILURE';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const BASE_API_URL = 'http://localhost:8080';

/**
 * @param  {[string]}   username
 * @param  {[string]}   password
 * @param  {[boolean]}  remember
 * @param  {[string]}   redirect [Redirect to page after success]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function loginUser (username, password, remember, redirect = '/') {
  return dispatch => {
    dispatch(loginUserRequest());
    return fetch(BASE_API_URL + '/session', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        email: username,
        password: password,
        remember: remember
      })
    })
    .then(checkHttpStatus)
    .then(req => req.json())
    .then(response => {
      console.log(response);
      try {
        dispatch(loginUserSuccess(response));
        dispatch(routeActions.push(redirect));
      } catch (e) {
        console.error(e);
        dispatch(loginUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token'
          }
        }));
      }
    })
    .catch(error => {
      console.error(error);
      dispatch(loginUserFailure(error));
    });
  };
}

/**
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function loginUserRequest () {
  return {
    type: LOGIN_USER_REQUEST
  };
}

/**
 * @param  {[object]} response [user and token credentials]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function loginUserSuccess (response) {
  updateAuthenticationCredentials(response);

  return {
    type: LOGIN_USER_SUCCESS,
    user: response.user
  };
}

/**
 * Refresh token on page load.
 *
 * @param  {[string]} redirect  [url after success]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function validateUserToken (redirect = '/') {
  return dispatch => {
    dispatch(authorizeUserRequest());
    return fetch(BASE_API_URL + '/session/refresh', {
      method: 'POST',
      headers: getHeaders()
    })
    .then(checkHttpStatus)
    .then(req => req.json())
    .then(response => {
      console.log(response);
      try {
        dispatch(loginUserSuccess(response));
        dispatch(routeActions.push(redirect));
      } catch (e) {
        console.error(e);
        dispatch(unauthorizedUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token'
          }
        }));
      }
    })
    .catch(error => {
      console.error(error);
      dispatch(unauthorizedUserFailure(error));
    });
  };
}

/**
 * Used to show page loading instead of locking
 * the login form when refreshing token.
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function authorizeUserRequest () {
  return {
    type: AUTHORIZE_USER_REQUEST
  };
}

/**
 * @param  {[object]} error [from API response]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function loginUserFailure (error) {
  localStorage.removeItem('auth');
  try {
    return {
      type: LOGIN_USER_FAILURE,
      status: error.response.status,
      errorText: 'Wrong username or password'
    };
  } catch (e) {
    // Catch if error.response.status isn't given
    return getServerFailure(LOGIN_USER_FAILURE);
  }
}

/**
 * @param  {[object]} error [from API response]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function unauthorizedUserFailure (error) {
  localStorage.removeItem('auth');
  try {
    return {
      type: UNAUTHORIZED_USER_FAILURE,
      status: error.response.status,
      errorText: 'unauthorized'
    };
  } catch (e) {
    // Catch if error.response.status isn't given
    return getServerFailure(UNAUTHORIZED_USER_FAILURE);
  }
}

/**
 * Gets called when there is a bigger error
 * like when the api cant be found and so on.
 *
 * @param  {[constant]} type [action type that called this function]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function getServerFailure (type) {
  return {
    type: type,
    status: 404,
    errorText: 'Something went wrong...'
  };
}

/**
 * @param  {[object]} credentials
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function updateAuthenticationCredentials (response) {
  if (response.hasOwnProperty('auth')) {
    let credentials = {};
    credentials.token = response.auth.token;

    if (response.auth.hasOwnProperty('code')) {
      credentials.id = response.auth.id;
      credentials.code = response.auth.code;

    } else {
      let auth = JSON.parse(localStorage.getItem('auth'));
      if (auth !== null && auth.hasOwnProperty('code')) {
        credentials.id = auth.id;
        credentials.code = auth.code;
      }
    }

    localStorage.setItem('auth', JSON.stringify(credentials));
  }
}

/**
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 * @todo use .hasOwnProperty
 */
export function getHeaders () {
  try {
    let auth = JSON.parse(localStorage.getItem('auth'));
    if (auth !== null) {
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': auth.token || null,
        'x-access-id': auth.id || null,
        'x-access-code': auth.code || null
      };
    }
  } catch (e) {}

  // Return without access credentials if not saved in local storage.
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
}

/**
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function logoutAndRedirect () {
  return dispatch => {
    return fetch(BASE_API_URL + '/session', {
      method: 'DELETE',
      headers: getHeaders()
    })
    .then(checkHttpStatus)
    .then(req => req.json())
    .then(response => {
      dispatch(logout());
      dispatch(routeActions.push('/login'));
    })
    .catch(error => {
      console.error(error);
      dispatch(logout());
      dispatch(routeActions.push('/login'));
    });
  };
}

/**
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function logout () {
  localStorage.removeItem('auth');

  return {
    type: LOGOUT_USER
  };
}
