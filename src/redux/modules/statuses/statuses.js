/**
 * Specify application status constants below
 * and add them to the initialState.
 */

// Statuses
export const STATUS_LOGIN = 'loginStatus';

export const initialState = {
  [STATUS_LOGIN]: {
    inProgress: false,
    status: null,
    message: null
  }
};
