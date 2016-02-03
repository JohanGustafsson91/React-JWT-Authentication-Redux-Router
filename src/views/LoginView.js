import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { loginUser } from '../redux/actions/authentication';

const LoginView = React.createClass({

  propTypes: {
    isAuthenticated: PropTypes.bool,
    isAuthenticating: PropTypes.bool,
    dispatch: PropTypes.func,
    location: PropTypes.object,
    errorText: PropTypes.string
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
        routeActions.push('/profile')
      );
    }
  },

  /**
  * Function that attempts to login a user.
  */
  _login () {
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    const redirectRoute = this.props.location.query.next || '/login';
    this.props.dispatch(loginUser(username, password, redirectRoute));
  },

  render () {
    return (
      <div className='row'>
        <div className='col-sm-4 col-sm-offset-4'>
          <h1>Login</h1>
          {
            this.props.errorText ?
            <p className='text-danger'>Fel användarnamn eller lösenord</p> : ''
            }
            <p><input
              type='text'
              className='form-control'
              defaultValue='admin@mackjakt.se'
              disabled={this.props.isAuthenticating}
              ref='username'
              placeholder='Enter username' /></p>
            <p><input
              type='password'
              className='form-control'
              defaultValue='6OSOFxkx6JEmVXiGmo1M'
              disabled={this.props.isAuthenticating}
              ref='password'
              placeholder='Enter password' /></p>
            <p><button
              className='btn btn-success'
              disabled={this.props.isAuthenticating}
              onClick={this._login}>Login</button></p>
        </div>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAuthenticating: state.auth.isAuthenticating,
  errorText: state.auth.errorText
});

export default connect(mapStateToProps)(LoginView);
