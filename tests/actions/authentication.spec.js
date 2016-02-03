import * as actions from 'redux/actions/authentication';

describe('actions', () => {

  it('should create an action to add a login user request', () => {
    const expectedAction = {
      type: actions.LOGIN_USER_REQUEST
    };
    expect(actions.loginUserRequest()).to.deep.equal(expectedAction);
  });

  it('should create an action to show unauthorized user failure', () => {
    const expectedAction = {
      type: actions.UNAUTHORIZED_USER_FAILURE
    };
    const error = {
        response: {
          status: 401
        }
    };
    expect(actions.UNAUTHORIZED_USER_FAILURE).to.exist;
    expect(actions.unauthorizedUserFailure).to.exist;
    expect(actions.unauthorizedUserFailure(error)).to.deep.equal(expectedAction);
  });
});
