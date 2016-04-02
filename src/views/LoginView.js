import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { loginUser } from '../redux/actions/authentication';
import PageLoading from '../components/PageLoading';
import Button from '../components/general-components/Button';
import CheckBox from '../components/general-components/CheckBox';
import TextInput from '../components/general-components/TextInput';

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
    let { username, password, remember } = this.state;
    let { dispatch, location } = this.props;
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
    let { isLoading, errorText, isAuthenticating } = this.props;
    let { username, password, remember } = this.state;

    // If validating, dont show login view
    if (isLoading) {
      return this._getLoadingView();
    }

    // Login error message
    let errorMessage = errorText ?
    <p className="text-danger">{errorText}</p> : '';

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
                disabled={isAuthenticating}
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
                disabled={isAuthenticating}
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
                disabled={isAuthenticating} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

LoginView.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isAuthenticating: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  errorText: PropTypes.string
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAuthenticating: state.auth.isAuthenticating,
  isLoading: state.auth.isLoading,
  errorText: state.auth.errorText
});

export default connect(mapStateToProps)(LoginView);
