import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { loginUser } from '../redux/actions/authentication';
import PageLoading from '../components/PageLoading';

const LoginView = React.createClass({

  /**
  * Only for UI components
  */
  getInitialState() {
    return {
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
  * Function that redirects the user from
  * login page if already logged in.
  */
  _redirectFromLogin () {
    if (this.props.isAuthenticated) {
      this.props.dispatch(
        routeActions.push(this.props.location.query.next || '/profile')
      );
    }
  },

  _login () {
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    const remember = this.state.remember;
    const redirectRoute = this.props.location.query.next || '/login';
    this.props.dispatch(
      loginUser(username, password, remember, redirectRoute)
    );
  },

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

    return (
      <form>
        <div className='row'>
          <div className='col-sm-4 col-sm-offset-4'>
            <h1>Login</h1>
            {
              this.props.errorText ?
              <p className='text-danger'>{this.props.errorText}</p> : ''
              }
              <p><input
                type='text'
                className='form-control'
                defaultValue='admin@admin.com'
                disabled={this.props.isAuthenticating}
                ref='username'
                placeholder='Enter username' /></p>
              <p><input
                type='password'
                className='form-control'
                disabled={this.props.isAuthenticating}
                ref='password'
                placeholder='Enter password' /></p>
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    ref="remember"
                    value={this.state.remember}
                    disabled={this.props.isAuthenticating}
                    onChange={() => this.setState({
                      remember: !this.state.checked
                    })} /> Remember me
                  </label>
                </div>
                <p><button
                  type="submit"
                  className='btn btn-success test-btn'
                  disabled={this.props.isAuthenticating}
                  onClick={this._login}>Login</button></p>
              </div>
            </div>
          </form>
        );
      }
    });

    LoginView.propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      isAuthenticating: PropTypes.bool.isRequired,
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
