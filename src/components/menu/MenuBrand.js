import React, { PropTypes } from 'react';

/**
 * Menu Brand in Menu.
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
const MenuBrand = React.createClass({

  propTypes: {
    handleClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string
  },

  render () {
    return (
      <a
        href="#"
        className="navbar-brand"
        onClick={() => this.props.handleClick(
          this.props.url
        )}>
        {this.props.name}
      </a>
    );
  }
});

export default MenuBrand;
