import React, { PropTypes } from 'react';

/**
 * Menu Brand in Menu.
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
class MenuBrand extends React.Component {
  render () {
    let { handleClick, url, name } = this.props;

    return (
      <a
        href="#"
        className="navbar-brand"
        onClick={() => handleClick(url)}>
        {name}
      </a>
    );
  }
}

MenuBrand.propTypes = {
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string
};

export default MenuBrand;
