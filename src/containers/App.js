import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { logoutAndRedirect } from '../redux/actions/authentication';
import '../../node_modules/font-awesome/scss/font-awesome.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/_stylesheet.scss';
import Menu from '../components/menu/Menu';

const App = React.createClass({

  /**
   * Specify the different types of menu items
   * for the application in the initial state.
   *
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  getInitialState () {
    return {
      guestMenuItems: [
        {name: 'Home', handler: this._redirectTo, url: '/'},
        {name: 'Login', handler: this._redirectTo, url: '/login'},
      ],
      authMenuItems: [
        {name: 'Home', handler: this._redirectTo, url: '/'},
        {name: 'Profile', handler: this._redirectTo, url: '/profile'},
        {name: 'Logout', handler: this._logout, url: null}
      ]
    };
  },

  /**
   * @return {[Menu]} [Correct menu]
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _getMenu () {

    // Get specifik menu options
    let menuItems = this._getMenuItems();
    let menuBrand = this._getMenuBrand();

    return (
      <Menu
        menuItems={menuItems}
        menuBrand={menuBrand} />
    );
  },

  /**
   * @return {[array]} [Array with correct menu items for menu]
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _getMenuItems () {
    if (this.props.isAuthenticated) {
      return this.state.authMenuItems;

    } else {
      return this.state.guestMenuItems;
    }
  },

  /**
   * @return {[object]} [Menu brand]
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _getMenuBrand () {
    if (this.props.isAuthenticated) {
      return {
        name: 'Welcome ' + this.props.name,
        handler: this._redirectTo,
        url: '/profile'
      };

    } else {
      return {
        name: 'Welcome guest',
        handler: this._redirectTo,
        url: '/'
      };
    }
  },

  /**
   * @param  {[string]} url [the new url]
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _redirectTo (url) {
    this.props.dispatch(
      routeActions.push(url)
    );
  },

  /**
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _logout () {
    this.props.dispatch(
      logoutAndRedirect()
    );
  },

  render () {
    return (
      <div>
        {
          this._getMenu()
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
