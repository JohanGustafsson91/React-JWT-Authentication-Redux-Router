/**
* Authentication actions
*/

import { routeActions } from 'react-router-redux';
import { checkHttpStatus } from '../utils';

// Constants
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const UNAUTHORIZED_USER_FAILURE = 'UNAUTHORIZED_USER_FAILURE';
export const BASE_API_URL = 'http://85.225.169.152:8080';

export function loginUserRequest () {
  return {
    type: LOGIN_USER_REQUEST
  };
}

export function loginUserSuccess (response) {
  localStorage.setItem('token', response.token);
  return {
    type: LOGIN_USER_SUCCESS,
    token: response.token,
    user: response.user
  };
}

/**
 * Gets called when there is a bigger error
 * like when the api cant be found and so on.
 */
export function getServerFailure (type) {
  return {
    type: type,
    status: 404,
    errorText: 'Something went wrong...'
  };
}

export function loginUserFailure (error) {
  localStorage.removeItem('token');
  try {
    return {
      type: LOGIN_USER_FAILURE,
      status: error.response.status,
      errorText: 'Wrong username or password'
    };
  } catch (e) {
    return getServerFailure(LOGIN_USER_FAILURE);
  }
}

export function unauthorizedUserFailure (error) {
  localStorage.removeItem('token');
  try {
    return {
      type: UNAUTHORIZED_USER_FAILURE,
    };
  } catch (e) {
    return getServerFailure(UNAUTHORIZED_USER_FAILURE);
  }
}

export function loginUser (username, password, redirect = '/') {
  return dispatch => {
    dispatch(loginUserRequest());
    return fetch(BASE_API_URL + '/session', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: username, password: password})
    })
    .then(checkHttpStatus)
    .then(req => req.json())
    .then(response => {
      try {
        dispatch(loginUserSuccess(response));
        dispatch(routeActions.push(redirect));
      } catch (e) {
        dispatch(loginUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token'
          }
        }));
      }
    })
    .catch(error => {
      dispatch(loginUserFailure(error));
    });
  };
}


export function validateUserToken (token, redirect = '/') {
  return dispatch => {
    dispatch(loginUserRequest());
    return fetch(BASE_API_URL + '/session/refresh', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
    .then(checkHttpStatus)
    .then(req => req.json())
    .then(response => {
      console.log(response);
      try {
        dispatch(loginUserSuccess(response));
        dispatch(routeActions.push(redirect));
      } catch (e) {
        dispatch(unauthorizedUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token'
          }
        }));
      }
    })
    .catch(error => {
      dispatch(unauthorizedUserFailure(error));
    });
  };
}

export function logout () {
  localStorage.removeItem('token');
  return {
    type: LOGOUT_USER
  };
}

export function logoutAndRedirect () {
  return (dispatch, state) => {
    dispatch(logout());
    dispatch(routeActions.push('/login'));
  };
}
