import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export function requireAuthentication (Component) {
  const AuthenticatedComponent = React.createClass({

    propTypes: {
      token: PropTypes.string,
      isAuthenticated: PropTypes.bool,
      location: PropTypes.object,
      dispatch: PropTypes.func
    },

    componentWillMount () {
      this._checkAuth();
    },

    componentWillReceiveProps (nextProps) {
      this._checkAuth();
    },

    /**
    * Function that checks if the user is authenticated.
    * If not the user is redirected to login page with
    * the current page as a next parameter.
    */
    _checkAuth () {
      if (!this.props.isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname;
        this.props.dispatch(
          push(`/login?next=${redirectAfterLogin}`)
        );
      }
    },

    render () {
      return (
        <div>
          {
            this.props.isAuthenticated === true ?
            <Component {...this.props} /> : null
          }
        </div>
      );
    }
  });

  const mapStateToProps = (state) => ({
    token: state.auth.token,
    userName: state.auth.userName,
    isAuthenticated: state.auth.isAuthenticated
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}
