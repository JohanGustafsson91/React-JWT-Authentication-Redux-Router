import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import {logoutAndRedirect} from '../redux/actions/authentication';
import '../../node_modules/font-awesome/scss/font-awesome.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/_stylesheet.scss';

const App = React.createClass({

  getInitialState () {
    return {
      showMenu: false
    };
  },

  componentDidUpdate(prevProps, prevState) {
    // Close menu on new page if last state was opened
    if (prevState.showMenu) {
      this.setState({
        showMenu: false
      });
    }
  },

  _getNavBar () {
    return (
      <nav className='navbar navbar-default'>
        <div className='container'>
          <div className='navbar-header'>

            {/* Menu button */}
            <button
              className='navbar-toggle'
              onClick={() => this.setState({
                showMenu: !this.state.showMenu
              })}>
              <i className='fa fa-bars'></i>
            </button>

            {/* Menu text to left */}
            <a className='navbar-brand' href='#'>
              {
                this.props.isAuthenticated ?
                'Welcome ' + this.props.name + '!' :
                'Welcome guest!'
              }
            </a>
          </div>

          <div
            className={this.state.showMenu ?
              'navbar-collapse' :
              'collapse navbar-collapse'} >
            {
              this.props.isAuthenticated ?
              this._getAuthenticatedNavbarItems() :
              this._getGuestNavbarItems()
            }
          </div>
        </div>
      </nav>
    );
  },

  /**
  * Function that returns the navbar for an
  * authenticated user.
  * @todo We can use roles here and return a
  *       different navbar with permissions.
  * @return {[navbar]}
  */
  _getAuthenticatedNavbarItems () {
    return (
      <ul className='nav navbar-nav navbar-right'>
        <li><Link to='/'>Home</Link></li>
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
  _getGuestNavbarItems () {
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
        {
          this._getNavBar()
        }
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

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  name: PropTypes.string,
  dispatch: PropTypes.func,
  children: PropTypes.object
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  name: state.auth.name
});

export default connect(mapStateToProps)(App);
