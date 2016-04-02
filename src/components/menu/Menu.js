import React, { PropTypes } from 'react';
import MenuItem from './MenuItem';
import MenuBrand from './MenuBrand';
import ToggleMenuButton from './ToggleMenuButton';
import * as _ from 'lodash';

class Menu extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    let { menuItems, menuBrand, showMenu, toggleMenu } = this.props;

    // Render menu items
    let itemsInMenu = menuItems.map((i) => {
      return (
        <MenuItem
          handleClick={i.handler}
          name={i.name}
          url={i.url}
          key={_.uniqueId('menuItem_')} />
      );
    });

    // Menu state open/closed
    let menuState = showMenu ? 'navbar-collapse' : 'collapse navbar-collapse';

    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">

            <ToggleMenuButton
              className="navbar-toggle"
              opened={showMenu}
              toggleMenu={() => toggleMenu()}
              openedIcon="fa fa-caret-square-o-up"
              closedIcon="fa fa-caret-square-o-down" />

            <MenuBrand
              handleClick={menuBrand.handler}
              url={menuBrand.url}
              name={menuBrand.name} />

          </div>

          <div className={menuState}>
              <ul className="nav navbar-nav navbar-right">
                {itemsInMenu}
              </ul>
          </div>

        </div>
      </nav>
    );
  }
}

Menu.propTypes = {
  menuItems: PropTypes.array.isRequired,
  menuBrand: PropTypes.object,
  showMenu: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

export default Menu;
