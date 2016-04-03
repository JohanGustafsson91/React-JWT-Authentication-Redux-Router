import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { loginUser } from '../redux/modules/auth/authentication';
import PageLoading from '../components/PageLoading';
import Button from '../components/general-components/Button';
import CheckBox from '../components/general-components/CheckBox';
import TextInput from '../components/general-components/TextInput';
import { STATUS_LOGIN } from '../redux/modules/statuses/statuses';

class LoginView extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      remember: false
    };

    this._redirectFromLogin = this._redirectFromLogin.bind(this);
  }

  componentWillMount () {
    this._redirectFromLogin();
  }

  componentWillReceiveProps (nextProps) {
    this._redirectFromLogin();
  }

  /**
   * Redirect user from login page if already logged in.
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _redirectFromLogin () {
    let { isAuthenticated, dispatch, location } = this.props;

    if (isAuthenticated) {
      dispatch(
        push(location.query.next || '/profile')
      );
    }
  }

  /**
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _login () {
    const { username, password, remember } = this.state;
    const { dispatch, location } = this.props;
    const redirectRoute = location.query.next || '/login';

    dispatch(
      loginUser(username, password, remember, redirectRoute)
    );
  }

  /**
   * @return {[component]} [PageLoading]
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _getLoadingView () {
    return (
      <PageLoading />
    );
  }

  render () {
    const { loginStatus, errorText, isAuthenticating } = this.props;
    const { username, password, remember } = this.state;

    // If validating, dont show login view
    if (loginStatus.inProgress === true) {
      return this._getLoadingView();
    }

    // Login error message
    let errorMessage = loginStatus.status === 'error' ?
    <p className="text-danger">{loginStatus.message}</p> : '';

    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
          <h1>Login</h1>
          {errorMessage}

          <div className="row" style={{marginTop: '15px'}}>
            <div className="col-xs-12">
              <TextInput
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) => {
                  this.setState({
                    username: e.target.value
                  });
                }} />
            </div>
          </div>

          <div className="row" style={{marginTop: '15px'}}>
            <div className="col-xs-12">
              <TextInput
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  this.setState({
                    password: e.target.value
                  });
                }} />
            </div>
          </div>

          <div className="row" style={{marginTop: '15px'}}>
            <div className="col-xs-12 col-sm-6">
              <CheckBox
                text="Remember me"
                checked={remember}
                onClick={() => {
                  this.setState({
                    remember: !remember
                  });
                }} />
            </div>
            <div className="col-xs-12 col-sm-6 text-right">
              <Button
                text="Login"
                baseStyle="btn btn-success"
                onClick={() => this._login()}
              />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

LoginView.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loginStatus: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginStatus: state.status[STATUS_LOGIN]
});

export default connect(mapStateToProps)(LoginView);
