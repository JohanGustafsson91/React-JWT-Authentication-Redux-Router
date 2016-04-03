import test from 'ava';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import * as actions from '../../../src/redux/modules/auth/authentication';
import { auth } from '../../../src/redux/modules/auth/authentication';
import * as status from '../../../src/redux/modules/statuses/statuses';
import * as helpers from '../../../src/redux/modules/auth/utils';
import { messages } from '../../../src/redux/utils/constants';

///////////////////
// Reducer tests //
///////////////////


test('Reducer -> Should return the initialState', t => {
  const expectedAction = {
    id: null,
    name: null,
    email: null,
    role: null,
    isAuthenticated: false
  };

  let initialState = auth(undefined, {});

  t.same(initialState, expectedAction);
});

test('Reducer -> Should handle LOGIN_USER_SUCCESS', t => {
  let updateAuthenticationCredentials = sinon.stub(helpers, 'updateAuthenticationCredentials');
  let payload = {};

  payload.user = {
    id: 'id',
    name: 'name',
    email: 'email',
    role: 'role'
  };

  const expectedAction = {
    id: 'id',
    name: 'name',
    email: 'email',
    role: 'role',
    isAuthenticated: true
  };

  let result = auth({}, {
    type: actions.LOGIN_USER_SUCCESS,
    payload: payload
  });

  updateAuthenticationCredentials.restore();

  sinon.assert.calledOnce(updateAuthenticationCredentials);
  t.same(result, expectedAction);
});

test('Reducer -> Should handle LOGIN_USER_FAILURE', t => {
  let removeToken = sinon.stub(helpers, 'removeToken');

  const stateBefore = {
    id: 'id',
    name: 'name',
    email: 'email',
    role: 'role',
    isAuthenticated: true
  };

  const expectedAction = {
    id: null,
    name: null,
    email: null,
    role: null,
    isAuthenticated: false
  };

  let result = auth(stateBefore, {
    type: actions.LOGIN_USER_FAILURE
  });

  removeToken.restore();

  sinon.assert.calledOnce(removeToken);
  t.same(result, expectedAction);
});

test('Reducer -> Should handle LOGOUT_USER', t => {
  let removeToken = sinon.stub(helpers, 'removeToken');

  const stateBefore = {
    id: 'id',
    name: 'name',
    email: 'email',
    role: 'role',
    isAuthenticated: true
  };

  const expectedAction = {
    id: null,
    name: null,
    email: null,
    role: null,
    isAuthenticated: false
  };

  let result = auth(stateBefore, {
    type: actions.LOGOUT_USER
  });

  removeToken.restore();

  sinon.assert.calledOnce(removeToken);
  t.same(result, expectedAction);
});


///////////////////
// Action tests  //
///////////////////

test('Action -> loginUser()', t => {
  const expectedAction = {
    API_URL: `${actions.BASE_API_URL}/session`,
    method: 'POST',
    headers: helpers.getHeaders(),
    body: {
      email: 'user',
      password: 'pass',
      remember: true
    },
    successMessage: messages.SUCCESS.LOGIN,
    errorMessage: messages.ERROR.LOGIN,
    redirectSuccess: '/login',
    types: [
      status.STATUS_LOGIN,
      actions.LOGIN_USER_SUCCESS,
      actions.LOGIN_USER_FAILURE
    ]
  };

  let result = actions.loginUser('user', 'pass', true, '/login');
  t.same(result, expectedAction);
});

test('Action -> logoutUser()', t => {
  const expectedAction = {
    API_URL: `${actions.BASE_API_URL}/session`,
    method: 'DELETE',
    headers: helpers.getHeaders(),
    redirectSuccess: '/login',
    redirectError: '/login',
    types: [
      false,
      actions.LOGOUT_USER,
      actions.LOGOUT_USER
    ]
  };

  let result = actions.logoutUser();
  t.same(result, expectedAction);
});

test('Action -> validateUserToken()', t => {
  const expectedAction = {
    API_URL: `${actions.BASE_API_URL}/session/refresh`,
    method: 'POST',
    headers: helpers.getHeaders(),
    successMessage: messages.SUCCESS.LOGIN,
    errorMessage: messages.ERROR.LOGIN,
    redirectSuccess: '/profile',
    redirectError: '/login',
    types: [
      status.STATUS_LOGIN,
      actions.LOGIN_USER_SUCCESS,
      actions.LOGIN_USER_FAILURE
    ]
  };

  let result = actions.validateUserToken('/profile');
  t.same(result, expectedAction);
});
