import test from 'ava';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import * as actions from '../../../src/redux/modules/auth/authentication';
import { auth } from '../../../src/redux/modules/auth/authentication';
import * as status from '../../../src/redux/modules/statuses/statuses';
import * as utils from '../../../src/redux/modules/auth/utils';
import { messages } from '../../../src/redux/utils/constants';

test('updateAuthenticationCredentials() with new', t => {
  // Stub localStorage setItem()
  let localStorageMock = sinon.stub(localStorage, 'setItem');

  // Code in auth should set new credentials in local storage
  const response = {
    auth: {
      id: 'newId',
      code: 'newCode'
    }
  };

  let expectedLocalStorageValues = JSON.stringify({
    id: 'newId',
    code: 'newCode'
  });

  utils.updateAuthenticationCredentials(response);

  localStorageMock.restore();

  sinon.assert.calledOnce(localStorageMock);
  sinon.assert.calledWith(localStorageMock, 'auth', expectedLocalStorageValues);
});

test('updateAuthenticationCredentials() with current', t => {

  // Stub localstorage getItem()
  let getItemMock = sinon.stub(localStorage, 'getItem', () => {
    return JSON.stringify({id: 'currentId', code: 'currentCode'});
  });

  // Stub localstorage setItem()
  let localStorageMock = sinon.stub(localStorage, 'setItem');

  // No code in auth should return current credentials in local storage
  const response = { auth: {} };

  let expectedLocalStorageValues = JSON.stringify({
    id: 'currentId',
    code: 'currentCode'
  });

  utils.updateAuthenticationCredentials(response);

  localStorageMock.restore();
  getItemMock.restore();

  sinon.assert.calledOnce(localStorageMock);
  sinon.assert.calledOnce(getItemMock);
  sinon.assert.calledWith(localStorageMock, 'auth', expectedLocalStorageValues);
});

test('getHeaders() with credentials', t => {
  // Stub localstorage getItem()
  let getItemMock = sinon.stub(localStorage, 'getItem', () => {
    return JSON.stringify({id: 'currentId', code: 'currentCode', token: 'currentToken'});
  });

  const expectedResponse = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': 'currentToken',
    'x-access-id': 'currentId',
    'x-access-code': 'currentCode'
  };

  let response = utils.getHeaders();

  getItemMock.restore();

  sinon.assert.calledOnce(getItemMock);
  t.same(response, expectedResponse);
});

test('getHeaders() without credentials', t => {
  // Stub localstorage getItem()
  let getItemMock = sinon.stub(localStorage, 'getItem', () => {
    return null;
  });

  const expectedResponse = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  let response = utils.getHeaders();

  getItemMock.restore();

  sinon.assert.calledOnce(getItemMock);
  t.same(response, expectedResponse);
});

test('removeToken() without credentials', t => {
  // Stub localstorage getItem()
  let removeItemMock = sinon.stub(localStorage, 'removeItem');

  utils.removeToken();

  removeItemMock.restore();

  sinon.assert.calledOnce(removeItemMock);
  sinon.assert.calledWith(removeItemMock, 'auth');
});
