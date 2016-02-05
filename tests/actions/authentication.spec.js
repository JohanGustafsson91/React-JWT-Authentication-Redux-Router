import * as actions from 'redux/actions/authentication';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TestUtils from 'react-addons-test-utils';
//import nock from 'nock';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Authentication Actions (sync)', () => {

  it('Should create an action to add a login user request', () => {
    const expectedAction = {
      type: actions.LOGIN_USER_REQUEST
    };
    expect(actions.loginUserRequest()).to.deep.equal(expectedAction);
  });

  it('Should create an action to authorize a user request', () => {
    const expectedAction = {
      type: actions.AUTHORIZE_USER_REQUEST
    };
    expect(actions.authorizeUserRequest()).to.deep.equal(expectedAction);
  });

  it('Should create an action to show login user success', () => {
    const expectedAction = {
      type: actions.LOGIN_USER_SUCCESS,
      token: 'testtoken',
      user: 'testuser'
    };
    const response = {
        token: 'testtoken',
        user: 'testuser'
    };
    expect(actions.loginUserSuccess(response)).to.deep.equal(expectedAction);
  });

  it('Should create an action to get a server failure', () => {
    const expectedAction = {
      type: actions.UNAUTHORIZED_USER_FAILURE,
      status: 404,
      errorText: 'Something went wrong...'
    };
    expect(actions.getServerFailure(actions.UNAUTHORIZED_USER_FAILURE)).to.deep.equal(expectedAction);
  });

  it('Should create an action to show unauthorized user failure', () => {
    const expectedAction = {
      type: actions.UNAUTHORIZED_USER_FAILURE
    };
    const error = {
        response: {
          status: 401
        }
    };
    expect(actions.unauthorizedUserFailure(error)).to.deep.equal(expectedAction);
  });

  it('Should create an action to logout user', () => {
    const expectedAction = {
      type: actions.LOGOUT_USER
    };
    expect(actions.logout()).to.deep.equal(expectedAction);
  });

});

/*describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates LOGIN_USER_SUCCESS when successfully logged in', (done) => {
    nock('http:localhost:8080')
      .post('/session', {
        email: 'admin@admin.se',
        password: 'secret'
      })
      .reply(200, { response: { token: 'example token', user: 'test'}});

    const expectedActions = [
      { type: types.LOGIN_USER_REQUEST },
      { type: types.LOGIN_USER_SUCCESS, response: { token: 'example token', user: 'test'} }
    ];
    const store = mockStore({ todos: [] }, expectedActions, done);
    store.dispatch(actions.loginUser('username', 'password', '/'));
  });
});*/
