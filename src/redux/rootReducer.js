import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { auth } from './reducers/authentication';

// Combine your reducers here
export default combineReducers({
  auth,
  router
});
