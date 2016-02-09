import * as actions from 'redux/actions/authentication';
import { auth } from 'redux/reducers/authentication';

describe('Authentication Reducer', () => {

  it('Should return the initial state', () => {
    expect(
      auth(undefined, {})
    ).to.deep.equal(
      {
        id: null,
        name: null,
        email: null,
        role: null,
        isAuthenticated: false,
        isLoading: false,
        isAuthenticating: false,
        errorText: null,
        successText: null
      }
    );
  });

  it('Should handle LOGIN_USER_REQUEST', () => {
    expect(
      auth({}, {
        type: actions.LOGIN_USER_REQUEST,
      })).to.deep.equal(
        {
          isAuthenticating: true,
          errorText: null
        }
      );
  });

  it('Should handle AUTHORIZE_USER_REQUEST', () => {
    expect(
      auth({}, {
        type: actions.AUTHORIZE_USER_REQUEST,
      })).to.deep.equal(
        {
          isLoading: true,
          errorText: null
        }
      );
    });

  it('Should handle UNAUTHORIZED_USER_FAILURE', () => {
    expect(
      auth({}, {
        type: actions.UNAUTHORIZED_USER_FAILURE,
        status: 401,
        errorText: null
      })).to.deep.equal(
        {
          id: null,
          name: null,
          email: null,
          role: null,
          isAuthenticated: false,
          isAuthenticating: false,
          isLoading: false,
          errorText: null,
          successText: null
        }
      );
  });

  it('Should handle LOGIN_USER_SUCCESS', () => {
    const response = {
      token: 'testtoken',
      user: {
        id: 'testid',
        name: 'testname',
        email: 'testemail',
        role: 'testrole'
      }
    };
    expect(
      auth({}, {
        type: actions.LOGIN_USER_SUCCESS,
        user: response.user
      })).to.deep.equal(
        {
          id: 'testid',
          name: 'testname',
          email: 'testemail',
          role: 'testrole',
          isAuthenticated: true,
          isAuthenticating: false,
          isLoading: false,
          errorText: null,
          successText: 'You have been successfully logged in.'
        }
      );
  });

  it('Should handle LOGIN_USER_FAILURE', () => {
    const response = {
      errorText: 'Something went wrong...'
    };
    expect(
      auth({}, {
        type: actions.LOGIN_USER_FAILURE,
        errorText: response.errorText
      })).to.deep.equal(
        {
          id: null,
          name: null,
          email: null,
          role: null,
          isAuthenticated: false,
          isAuthenticating: false,
          isLoading: false,
          errorText: 'Something went wrong...',
          successText: null
        }
      );
  });

  it('Should handle UNAUTHORIZED_USER_FAILURE', () => {
    expect(
      auth({}, {
        type: actions.UNAUTHORIZED_USER_FAILURE
      })).to.deep.equal(
        {
          id: null,
          name: null,
          email: null,
          role: null,
          isAuthenticated: false,
          isAuthenticating: false,
          isLoading: false,
          errorText: null,
          successText: null
        }
      );
  });

  it('Should handle LOGOUT_USER', () => {
    expect(
      auth({}, {
        type: actions.LOGOUT_USER
      })).to.deep.equal(
        {
          id: null,
          name: null,
          email: null,
          role: null,
          isAuthenticated: false,
          isLoading: false,
          errorText: null,
          successText: 'You have been successfully logged out.'
        }
      );
  });


});
