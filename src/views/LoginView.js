import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { loginUser } from '../redux/actions/authentication';
import PageLoading from '../components/PageLoading';
import Button from '../components/general-components/Button';
import CheckBox from '../components/general-components/CheckBox';
import TextInput from '../components/general-components/TextInput';

const LoginView = React.createClass({

  propTypes: {
    isAuthenticated: PropTypes.bool.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    errorText: PropTypes.string
  },

  /**
  * Only for UI components
  */
  getInitialState () {
    return {
      username: '',
      password: '',
      remember: false
    };
  },

  componentWillMount () {
    this._redirectFromLogin();
  },

  componentWillReceiveProps (nextProps) {
    this._redirectFromLogin();
  },

  /**
   * Redirect user from login page if already logged in.
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _redirectFromLogin () {
    if (this.props.isAuthenticated) {
      this.props.dispatch(
        routeActions.push(this.props.location.query.next || '/profile')
      );
    }
  },

  /**
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _login () {
    const username = this.state.username;
    const password = this.state.password;
    const remember = this.state.remember;
    const redirectRoute = this.props.location.query.next || '/login';

    this.props.dispatch(
      loginUser(username, password, remember, redirectRoute)
    );
  },

  /**
   * @return {[component]} [PageLoading]
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _getLoadingView () {
    return (
      <PageLoading />
    );
  },

  render () {
    // If validating, dont show login view
    if (this.props.isLoading) {
      return this._getLoadingView();
    }

    // Login error message
    let errorMessage = this.props.errorText ?
    <p className="text-danger">{this.props.errorText}</p> : '';

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
                disabled={this.props.isAuthenticating}
                placeholder="Enter username"
                value={this.state.username}
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
                disabled={this.props.isAuthenticating}
                placeholder="Enter password"
                value={this.state.password}
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
                checked={this.state.remember}
                onClick={() => {
                  this.setState({
                    remember: !this.state.remember
                  });
                }} />
            </div>
            <div className="col-xs-12 col-sm-6 text-right">
              <Button
                text="Login"
                baseStyle="btn btn-success"
                onClick={this._login}
                disabled={this.props.isAuthenticating} />
            </div>
          </div>

        </div>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAuthenticating: state.auth.isAuthenticating,
  isLoading: state.auth.isLoading,
  errorText: state.auth.errorText
});

export default connect(mapStateToProps)(LoginView);
