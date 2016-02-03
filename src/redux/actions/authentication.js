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
export const LOGIN_URL = 'http://mackjakt.se:8080/session';

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

export function loginUserFailure (error) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    status: error.response.status,
    errorText: error.response.statusText
  };
}

export function loginUser (username, password, redirect = '/') {
  return dispatch => {
    dispatch(loginUserRequest());
    return fetch(LOGIN_URL, {
      method: 'post',
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
        console.log('Response: ', response);
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

// @todo
export function validateUserToken (token) {

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
