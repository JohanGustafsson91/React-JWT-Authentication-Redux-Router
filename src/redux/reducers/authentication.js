import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  LOGIN_USER_FAILURE,
  UNAUTHORIZED_USER_FAILURE,
  AUTHORIZE_USER_REQUEST
} from '../actions/authentication';

/**
* Initial state for authentication
* information.
*/
const initialState = {
  id: null,
  name: null,
  email: null,
  role: null,
  isAuthenticated: false,
  isAuthenticating: false,
  isLoading: false,
  errorText: null,
  successText: null
};

/**
* Reducer for authentication.
*/
export function auth (state = initialState, action) {
  switch (action.type) {

    case LOGIN_USER_REQUEST: {
      return Object.assign({}, state, {
        isAuthenticating: true,
        errorText: null
      });
    }

    case AUTHORIZE_USER_REQUEST: {
      return Object.assign({}, state, {
        isLoading: true,
        errorText: null
      });
    }

    case LOGIN_USER_SUCCESS: {
      return Object.assign({}, state, {
        id: action.user.id,
        name: action.user.name,
        email: action.user.email,
        role: action.user.role,
        isAuthenticated: true,
        isAuthenticating: false,
        isLoading: false,
        errorText: null,
        successText: 'You have been successfully logged in.'
      });
    }

    case LOGIN_USER_FAILURE: {
      return Object.assign({}, state, {
        id: null,
        name: null,
        email: null,
        role: null,
        isAuthenticated: false,
        isAuthenticating: false,
        isLoading: false,
        errorText: `${action.errorText}`,
        successText: null
      });
    }

    case UNAUTHORIZED_USER_FAILURE: {
      return Object.assign({}, state, {
        id: null,
        name: null,
        email: null,
        role: null,
        isAuthenticated: false,
        isAuthenticating: false,
        isLoading: false,
        errorText: null,
        successText: null
      });
    }

    case LOGOUT_USER: {
      return Object.assign({}, state, {
        id: null,
        name: null,
        email: null,
        role: null,
        isAuthenticated: false,
        isLoading: false,
        errorText: null,
        successText: 'You have been successfully logged out.'
      });
    }

    default: {
      return state;
    }
  }
}
