import React, { PropTypes } from 'react';
import MenuItem from './MenuItem';
import MenuBrand from './MenuBrand';
import ToggleMenuButton from './ToggleMenuButton';

const Menu = React.createClass({

  propTypes: {
    menuItems: PropTypes.array.isRequired,
    menuBrand: PropTypes.object
  },

  getInitialState () {
    return {
      showMenu: false
    };
  },

  /**
   * Close menu on new page if last state was opened.
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  componentDidUpdate (prevProps, prevState) {
    if (prevState.showMenu === true) {
      this._toggleMenu();
    }
  },

  /**
   * @author Johan Gustafsson <johan.gustafsson@solidio.se>
   */
  _toggleMenu () {
    this.setState({
      showMenu: !this.state.showMenu
    });
  },

  render () {
    // Render menu items
    let idCounter = 0;
    let menuItems = this.props.menuItems.map((i) => {
      // Generate unique key for react
      let itemKey = 'menuItem_' + idCounter;
      idCounter += 1;

      return (
        <MenuItem
          handleClick={i.handler}
          name={i.name}
          url={i.url}
          key={itemKey} />
      );
    });

    // Menu state open/closed
    let menuState = this.state.showMenu ?
                    'navbar-collapse' :
                    'collapse navbar-collapse';

    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">

            <ToggleMenuButton
              className="navbar-toggle"
              opened={this.state.showMenu}
              toggleMenu={this._toggleMenu}
              openedIcon="fa fa-caret-square-o-up"
              closedIcon="fa fa-caret-square-o-down" />

            <MenuBrand
              handleClick={this.props.menuBrand.handler}
              url={this.props.menuBrand.url}
              name={this.props.menuBrand.name} />

          </div>

          <div className={menuState}>
              <ul className="nav navbar-nav navbar-right">
                {menuItems}
              </ul>
          </div>

        </div>
      </nav>
    );
  }
});

export default Menu;
