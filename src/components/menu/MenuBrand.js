import React, { PropTypes } from 'react';

/**
 * Menu Brand in Menu.
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
const MenuBrand = React.createClass({
  render () {
    return (
      <a
        href="#"
        className='navbar-brand'
        onClick={() => this.props.handleClick(
          this.props.url
        )}>
        {this.props.name}
      </a>
    );
  }
});

MenuBrand.propTypes = {
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string
};

export default MenuBrand;
