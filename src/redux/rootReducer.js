import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { auth } from './modules/auth/authentication';
import { status } from './modules/statuses/statusProgress';

// Combine your reducers here
export default combineReducers({
  auth,
  status,
  router
});
