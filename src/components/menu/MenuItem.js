import React, { PropTypes } from 'react';

/**
 * Menu item/button in Menu.
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
class MenuItem extends React.Component {
  render () {
    let { handleClick, url, name } = this.props;

    return (
      <li>
        <a href="#" onClick={() => handleClick(url)}>
          {name}
        </a>
      </li>
    );
  }
}

MenuItem.propTypes = {
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string
};

export default MenuItem;
