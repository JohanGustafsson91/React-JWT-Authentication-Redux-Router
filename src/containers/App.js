import 'babel-polyfill';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logoutAndRedirect } from '../redux/actions/authentication';
import '../../node_modules/font-awesome/scss/font-awesome.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/_stylesheet.scss';
import Menu from '../components/menu/Menu';

class App extends React.Component {

  constructor (props) {
    super(props);

    this._getMenuItems = this._getMenuItems.bind(this);
    this._getMenuBrand = this._getMenuBrand.bind(this);
    this._redirectTo = this._redirectTo.bind(this);
    this._logout = this._logout.bind(this);
    this._toggleMenu = this._toggleMenu.bind(this);

    this.state = {
      guestMenuItems: [
        {name: 'Home', handler: this._redirectTo, url: '/'},
        {name: 'Login', handler: this._redirectTo, url: '/login'}
      ],
      authMenuItems: [
        {name: 'Home', handler: this._redirectTo, url: '/'},
        {name: 'Profile', handler: this._redirectTo, url: '/profile'},
        {name: 'Logout', handler: this._logout, url: null}
      ],
      showMenu: false
    };
  }

  /**
   * @return {[Menu]} [Correct menu]
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _getMenu () {
    let { showMenu } = this.state;
    let menuItems = this._getMenuItems();
    let menuBrand = this._getMenuBrand();

    return (
      <Menu
        menuItems={menuItems}
        menuBrand={menuBrand}
        showMenu={showMenu}
        toggleMenu={this._toggleMenu} />
    );
  }

  /**
   * @param  {[boolean]} state [false -> close menu]
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _toggleMenu (state = null) {
    let { showMenu } = this.state;

    this.setState({
      showMenu: state === null ? !showMenu : false
    });
  }

  /**
   * @return {[array]} [Array with correct menu items for menu]
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _getMenuItems () {
    let { isAuthenticated } = this.props;
    let { authMenuItems, guestMenuItems } = this.state;

    if (isAuthenticated) {
      return authMenuItems;
    } else {
      return guestMenuItems;
    }
  }

  /**
   * @return {[object]} [Menu brand]
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _getMenuBrand () {
    let { isAuthenticated, name } = this.props;

    if (isAuthenticated) {
      return {
        name: 'Welcome ' + name,
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
  }

  /**
   * @param  {[string]} url [the new url]
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _redirectTo (url) {
    let { dispatch } = this.props;
    this._toggleMenu(false);
    dispatch(push(url));
  }

  /**
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _logout () {
    let { dispatch } = this.props;
    this._toggleMenu(false);
    dispatch(logoutAndRedirect());
  }

  render () {
    let { children } = this.props;

    return (
      <div>
        {this._getMenu()}
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
