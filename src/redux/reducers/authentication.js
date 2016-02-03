import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  LOGIN_USER_FAILURE
} from '../actions/authentication';

/**
* Initial state for authentication
* information.
*/
const initialState = {
  token: null,
  id: null,
  name: null,
  email: null,
  role: null,
  isAuthenticated: false,
  isAuthenticating: false,
  errorText: null,
  successText: null
};

/**
* Reducer for authentication.
*/
export function auth (state = initialState, action) {
  switch (action.type) {

    case LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true,
        errorText: null
      });

    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        token: action.token,
        id: action.user._id,
        name: action.user.name,
        email: action.user.email,
        role: action.user.role,
        isAuthenticated: true,
        isAuthenticating: false,
        errorText: null,
        successText: 'You have been successfully logged in.'
      });

    case LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        token: null,
        id: null,
        name: null,
        email: null,
        role: null,
        isAuthenticated: false,
        isAuthenticating: false,
        errorText: `Authentication Error: ${action.status} ${action.statusText}`,
        successText: null
      });

    case LOGOUT_USER:
      return Object.assign({}, state, {
        token: null,
        id: null,
        name: null,
        email: null,
        role: null,
        isAuthenticated: false,
        errorText: null,
        successText: 'You have been successfully logged out.'
      });

    default:
      return state;
  }
}
