import React, {PropTypes} from 'react';
var classNames = require('classnames');

const CheckBox = React.createClass({

  propTypes: {
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    design: PropTypes.string,
    style: PropTypes.string,
    checked: PropTypes.bool
  },

  defaultBaseDesign: {
    width: '25px',
    height: '25px',
    backgroundColor: 'rgba(0,0,0,.12)',
    borderRadius: '3px',
    float: 'left',
    margin: '3px 3px 3px 0',
    cursor: 'pointer'
  },

  // The center of the checkbox if checked
  defaultFillDesign: {
    position: 'absolute',
    width: '15px',
    height: '15px',
    margin: '5px',
    borderRadius: '2px',
    backgroundColor: 'rgba(0,0,0,.5)'
  },

  defaultTextDesign: {
    float: 'left',
    margin: '3px 0 0 10px'
  },

  render () {
    const {text, checked, design, onClick} = this.props;
    let textContent, filled, checkboxStyles;

    checkboxStyles = classNames(design, {
      'checked': checked
    });

    if (text) {
      textContent = (<p
        style={this.defaultTextDesign}
        className="text">{text}</p>);
    }

    if (checked) {
      filled = (<div
        style={this.defaultFillDesign}
        className="solid-checkbox-filled">
      </div>);
    }

    return (
      <div className={checkboxStyles} onClick={onClick}>
        <div className="solid-checkbox-base" style={this.defaultBaseDesign}>
          {filled}
        </div>
        {textContent}
      </div>
    );
  }
});

export default CheckBox;
