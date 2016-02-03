import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import {logoutAndRedirect} from '../redux/actions/authentication';

const App = React.createClass({

  propTypes: {
    isAuthenticated: PropTypes.bool,
    name: PropTypes.string,
    dispatch: PropTypes.func,
    children: PropTypes.object
  },

  /**
  * Function that returns the navbar for an
  * authenticated user.
  * @todo We can use roles here and return a
  *       different navbar with permissions.
  * @return {[navbar]}
  */
  _getAuthenticatedNavbar () {
    return (
      <ul className='nav navbar-nav navbar-right'>
        <li><Link to='/profile'>Profile</Link></li>
        <li>
          <a href='#'
            onClick={() => this.props.dispatch(
              logoutAndRedirect()
            )}>Logout
          </a>
        </li>
      </ul>
    );
  },

  /**
  * Function that returns the guest navbar items.
  * @return {[navbar]}
  */
  _getGuestNavbar () {
    return (
      <ul className='nav navbar-nav navbar-right'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/login'>Login</Link></li>
      </ul>
    );
  },

  render () {
    return (
      <div>
        <nav className='navbar navbar-default'>
          <div className='container'>
            <div className='navbar-header'>
              <Link className='navbar-brand' to='/'>
                {
                  this.props.isAuthenticated ?
                  'Welcome ' + this.props.name + '!' : 'Welcome guest'
                }
              </Link>
            </div>
            <div id='navbar'>
              {
                this.props.isAuthenticated ?
                this._getAuthenticatedNavbar() :
                this._getGuestNavbar()
              }
            </div>
          </div>
        </nav>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  name: state.auth.name
});

export default connect(mapStateToProps)(App);
