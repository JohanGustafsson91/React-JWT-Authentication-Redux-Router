import React, { PropTypes } from 'react';

/**
 * Menu item/button in Menu.
 * 
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
const MenuItem = React.createClass({
  render () {
    return (
      <li>
        <a href="#"
          onClick={() => this.props.handleClick(
            this.props.url
          )}>
          {this.props.name}
        </a>
      </li>
    );
  }
});

MenuItem.propTypes = {
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string
};

export default MenuItem;
