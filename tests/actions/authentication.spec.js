import * as actions from 'redux/actions/authentication';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TestUtils from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Authentication Actions (sync)', () => {
  let _spies;

  beforeEach(function () {
    _spies = {};
    _spies.removeCredentials = sinon.stub(localStorage, 'removeItem');
    _spies.setItem = sinon.stub(localStorage, 'setItem');
  });

  afterEach(function () {
    localStorage.removeItem.restore();
    localStorage.setItem.restore();
  });

  it('Should create an action to add a login user request', () => {
    const expectedAction = {
      type: actions.LOGIN_USER_REQUEST
    };
    expect(actions.loginUserRequest()).to.deep.equal(expectedAction);
  });

  it('Should create an action to authorize a user request', () => {
    const expectedAction = {
      type: actions.AUTHORIZE_USER_REQUEST
    };
    expect(actions.authorizeUserRequest()).to.deep.equal(expectedAction);
  });

  it('Should create an action to show login user success', () => {

    const expectedAction = {
      type: actions.LOGIN_USER_SUCCESS,
      user: 'testuser'
    };
    const response = {
      auth: {
        token: 'testtoken',
        id: 'testid',
        code: 'testcode'
      },
      user: 'testuser'
    };

    var test = actions.loginUserSuccess(response);
    expect(test).to.deep.equal(expectedAction);
  });

  it('Should create an action to get a server failure', () => {
    const expectedAction = {
      type: actions.UNAUTHORIZED_USER_FAILURE,
      status: 404,
      errorText: 'Something went wrong...'
    };
    expect(
      actions.getServerFailure(actions.UNAUTHORIZED_USER_FAILURE)
    ).to.deep.equal(expectedAction);
  });

  it('Should create an action to show unauthorized user failure', () => {
    const expectedAction = {
      type: actions.UNAUTHORIZED_USER_FAILURE,
      status: 401,
      errorText: 'unauthorized'
    };
    const error = {
        response: {
          status: 401
        }
    };
    expect(actions.unauthorizedUserFailure(error)).to.deep.equal(expectedAction);
    expect(_spies.removeCredentials).to.have.been.calledWith('auth');
  });

  it('Should create an action to show a login failure', () => {
    const expectedAction = {
      type: actions.LOGIN_USER_FAILURE,
      status: 500,
      errorText: 'Wrong username or password'
    };
    const error = {
        response: {
          status: 500,
        }
    };
    expect(actions.loginUserFailure(error)).to.deep.equal(expectedAction);
    expect(_spies.removeCredentials).to.have.been.calledWith('auth');
  });

  it('Should create an action to logout user', () => {
    const expectedAction = {
      type: actions.LOGOUT_USER
    };

    expect(actions.logout()).to.deep.equal(expectedAction);
    expect(_spies.removeCredentials).to.have.been.calledWith('auth');
  });

  it('Should create an action to get request headers with token credentials', () => {
    const expectedAction = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': 'testtoken',
        'x-access-id': null,
        'x-access-code': null
    };

    let getItem = sinon.stub(localStorage, 'getItem').returns(JSON.stringify({
      token: 'testtoken',
      id: '',
      code: ''
    }));

    var test = actions.getHeaders();
    expect(test).to.deep.equal(expectedAction);
    expect(getItem).to.have.been.calledOnce;

    localStorage.getItem.restore();
  });

  it('Should create an action to get request headers without token credentials', () => {
    const expectedAction = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    _spies.getItem = sinon.stub(localStorage, 'getItem').returns(JSON.stringify(null));

    var test = actions.getHeaders();
    expect(test).to.deep.equal(expectedAction);
    expect(_spies.getItem).to.have.been.calledOnce;
    localStorage.getItem.restore();
  });

  it('Should only update token when id and code arent given', () => {

    let getItem = sinon.stub(localStorage, 'getItem').returns(JSON.stringify({
      token: 'test',
    }));

    let responseFromApi = {
      auth: {
        token: 'newToken'
      }
    };

    let expectedAction = {
      token: 'newToken'
    };

    actions.updateAuthenticationCredentials(responseFromApi);
    expect(getItem).to.have.been.calledWith('auth');
    expect(_spies.setItem).to.have.been.calledWith('auth', JSON.stringify(expectedAction));
  });


  it('Should update token, id and code after request if given', () => {

    let responseFromApi = {
      auth: {
        token: 'newToken',
        id: 'newId',
        code: 'newAuth'
      }
    };

    let expectedAction = {
      token: 'newToken',
      id: 'newId',
      code: 'newAuth'
    };

    actions.updateAuthenticationCredentials(responseFromApi);
    expect(_spies.setItem).to.have.been.calledWith('auth', JSON.stringify(expectedAction));
  });

  it('Should not update token, id and code after request when not given', () => {
    let responseFromApi = {
      no: {
        token: 'newToken',
        code: 'newAuth',
        id: 'newId'
      }
    };

    let expectedAction = {
      token: 'newToken',
      code: 'newAuth',
      id: 'newId'
    };

    actions.updateAuthenticationCredentials(responseFromApi);
    expect(_spies.setItem).to.not.have.been.calledWith('auth', JSON.stringify(expectedAction));
  });

});
