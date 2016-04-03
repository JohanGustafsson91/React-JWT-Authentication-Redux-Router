import fetch from 'isomorphic-fetch';
import 'es6-promise';
import { showStatus } from '../modules/statuses/statusProgress';
import { push } from 'react-router-redux';

/**
 * Middleware that performs an API call if the next action contains one.
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function apiMiddleware () {
  return next => action => {
    return isRequest(action) ? callApi(action, next) : next(action);
  };
}

/**
 * Checks if the next action is a request.
 * @param  {[string]} { url } [api url]
 * @return {Boolean}  [true if request, else false]
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
function isRequest ({ API_URL }) {
  return API_URL !== 'undefined' && typeof API_URL === 'string';
}

/**
 * Validates the http status from the API.
 * @param  {[object]} response [response from api]
 * @return {[object or error]}
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
function checkStatus (response) {
  if (response.status >= 200 && response.status <= 304) {
    return response;
  } else {
    // Invalid response
    const error = new Error(response.statusText || response.status);
    error.response = response.json();
    throw error;
  }
}

/**
 * @param  {[object]} response  [from API]
 * @return {[object]}           [json object]
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
function parseJSON (response) {
  return response.json();
}

/**
 * Performs a call to the API.
 * @param  {[array]}  types     [status object and success action]
 * @param  {[type]}   method    [GET, POST and so on...]
 * @param  {[type]}   headers   [request headers]
 * @param  {[type]}   body      [body parameters]
 * @param  {[type]}   url       [api url]
 * @param  {Function} next      [dispatch]
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
function callApi (action, next) {
  const { types, method, headers, body, API_URL, ...rest } = action;
  const [ STATUS, SUCCESS, FAILURE ] = types;

  // Dispatch loading status if it's specified
  if (STATUS !== false) {
    next(showStatus(STATUS, true, null, null));
  }

  /* Specify api call parameters */
  let params = {};
  params.method = method || 'get';
  params.headers = headers || {};
  params.body = JSON.stringify(body) || {};

  /**
   * Perform the api call.
   */
  return fetch(API_URL, params)
  .then(checkStatus)
  .then(parseJSON)
  .then(data => {
    // Dispatch and show success status if it's specified
    if (STATUS !== false) {
      next(showStatus(STATUS, false, 'success', action.successMessage));
    }

    // Dispatch the success action
    next({ ...rest, payload: data, type: SUCCESS });

    // Redirect after success if it's specified
    if (action.redirectSuccess !== 'undefined') {
      next(push(action.redirectSuccess));
    }
  })
  .catch(error => {
    // Dispatch and show error status if it's specified
    if (STATUS !== false) {
      next(showStatus(STATUS, false, 'error', action.errorMessage));
    }

    // Dispatch error action
    next({ ...rest, error, type: FAILURE });

    // Redirect after error if it's specified
    if (action.redirectError !== 'undefined') {
      next(push(action.redirectError));
    }
  });
}
