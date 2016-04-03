/**
 * Modular status reducer.
 *
 * Handles all statuses like requests,success and
 * failure messages that may be shown in the ui.
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */

// Constants
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const RESET_STATUS = 'RESET_STATUS';
import { STATUS_LOGIN } from './statuses';
import { initialState } from './statuses';

//////////////
// Reducer  //
//////////////

export function status (state = initialState, action) {
  switch (action.type) {

    case UPDATE_STATUS: {
      return Object.assign({}, state, {
        [action.statusObject]: {
          inProgress: action.inProgress,
          status: action.status,
          message: action.message
        }
      });
    }

    case RESET_STATUS: {
      return Object.assign({}, state, {
        [action.statusObject]: {
          inProgress: false,
          status: null,
          message: null
        }
      });
    }

    default: {
      return state;
    }
  }
}

/////////////
// Actions //
/////////////

/**
 * @param  {[string]} statusObject  [name of status object]
 * @param  {[boolean]} progress     [true / false]
 * @param  {[string]} status        ['error' / 'success']
 * @param  {[string]} message       [message to show]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function showStatus (statusObject, progress, status, message) {
  return {
    type: UPDATE_STATUS,
    statusObject: statusObject,
    inProgress: progress,
    status: status,
    message: message
  };
}

/**
 * @param  {[string]} statusObject [name of status object]
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
export function resetStatus (statusObject) {
  return {
    type: RESET_STATUS,
    statusObject: statusObject
  };
}
