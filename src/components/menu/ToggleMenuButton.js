import React, { PropTypes } from 'react';

/**
 * Menu button to toggle the state open/close in Menu.
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
class ToggleMenuButton extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    let { className, toggleMenu, opened, openedIcon, closedIcon } = this.props;

    return (
      <button className={className} onClick={toggleMenu}>
        <i className={opened ? openedIcon : closedIcon}></i>
      </button>
    );
  }
}

ToggleMenuButton.propTypes = {
  opened: PropTypes.bool.isRequired,
  openedIcon: PropTypes.string.isRequired,
  closedIcon: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default ToggleMenuButton;
