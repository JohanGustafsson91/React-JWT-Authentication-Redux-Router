import React, {PropTypes} from 'react';
var classNames = require('classnames');

class CheckBox extends React.Component {
  render () {
    let defaultBaseDesign = {
      width: '25px',
      height: '25px',
      backgroundColor: 'rgba(0,0,0,.12)',
      borderRadius: '3px',
      float: 'left',
      margin: '3px 3px 3px 0',
      cursor: 'pointer'
    };

    // The center of the checkbox if checked
    let defaultFillDesign = {
      position: 'absolute',
      width: '15px',
      height: '15px',
      margin: '5px',
      borderRadius: '2px',
      backgroundColor: 'rgba(0,0,0,.5)'
    };

    let defaultTextDesign = {
      float: 'left',
      margin: '3px 0 0 10px'
    };

    const {text, checked, design, onClick, disabled} = this.props;
    let textContent, filled, checkboxStyles;

    checkboxStyles = classNames(design, {
      'checked': checked
    });

    if (text) {
      textContent = (<p
        style={defaultTextDesign}
        className="text">{text}</p>);
    }

    if (checked) {
      filled = (<div
        style={defaultFillDesign}
        className="solid-checkbox-filled">
      </div>);
    }

    return (
      <div className={checkboxStyles} onClick={onClick}>
        <div className="solid-checkbox-base" style={defaultBaseDesign}>
          {filled}
        </div>
        {textContent}
      </div>
    );
  }
}

CheckBox.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  design: PropTypes.string,
  style: PropTypes.string,
  checked: PropTypes.bool
};

export default CheckBox;
