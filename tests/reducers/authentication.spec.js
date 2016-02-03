import * as actions from 'redux/actions/authentication';
import { auth } from 'redux/reducers/authentication';

describe('auth reducer', () => {

  it('should return the initial state', () => {
    expect(
      auth(undefined, {})
    ).to.deep.equal(
      {
        token: null,
        id: null,
        name: null,
        email: null,
        role: null,
        isAuthenticated: false,
        isAuthenticating: false,
        errorText: null,
        successText: null
      }
    );
  });

  it('should handle UNAUTHORIZED_USER_FAILURE', () => {
    expect(
      auth({}, {
        type: actions.UNAUTHORIZED_USER_FAILURE,
        status: 401,
        errorText: null
      })).to.deep.equal(
        {
          token: null,
          id: null,
          name: null,
          email: null,
          role: null,
          isAuthenticated: false,
          isAuthenticating: false,
          errorText: null,
          successText: null
        }
      );
  });

});
