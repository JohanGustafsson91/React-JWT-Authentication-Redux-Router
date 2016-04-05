import test from 'ava';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import * as actions from '../../../src/redux/modules/statuses/statusProgress';
import { status } from '../../../src/redux/modules/statuses/statusProgress';
import * as statuses from '../../../src/redux/modules/statuses/statuses';

//////////////
// Reducer  //
//////////////

test('Reducer should return the initialState', t => {
  let initialStateResult = status(undefined, {});
  t.same(initialStateResult, statuses.initialState);
});

test('Reducer should handle UPDATE_STATUS', t => {
  const THE_STATUS = 'theStatus';

  let initialState = {
    [THE_STATUS]: {
      inProgress: false,
      status: null,
      message: null
    }
  };

  let expectedState = {
    [THE_STATUS]: {
      inProgress: true,
      status: null,
      message: 'loading'
    }
  };

  let newState = status(initialState, {
    type: actions.UPDATE_STATUS,
    statusObject: [THE_STATUS],
    inProgress: true,
    status: null,
    message: 'loading'
  });

  t.same(newState, expectedState);
});


test('Reducer should handle RESET_STATUS', t => {
  const THE_STATUS = 'theStatus';

  let initialState = {
    [THE_STATUS]: {
      inProgress: false,
      status: 'success',
      message: 'success message'
    }
  };

  let expectedState = {
    [THE_STATUS]: {
      inProgress: false,
      status: null,
      message: null
    }
  };

  let newState = status(initialState, {
    type: actions.RESET_STATUS,
    statusObject: [THE_STATUS]
  });

  t.same(newState, expectedState);
});

//////////////
// Actions  //
//////////////

test('Action showStatus()', t => {
  let statusObject = {
    'THE_STATUS': {
      inProgress: false,
      status: null,
      message: null
    }
  };

  let expectedAction = {
    type: actions.UPDATE_STATUS,
    statusObject: statusObject,
    inProgress: true,
    status: null,
    message: null
  };

  let result = actions.showStatus(statusObject, true, null, null);

  t.same(result, expectedAction);
});

test('Action resetStatus()', t => {
  let statusObject = {
    'THE_STATUS': {
      inProgress: false,
      status: null,
      message: null
    }
  };

  let expectedAction = {
    type: actions.RESET_STATUS,
    statusObject: statusObject,
  };

  let result = actions.resetStatus(statusObject);

  t.same(result, expectedAction);
});
