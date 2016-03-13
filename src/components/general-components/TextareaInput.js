import React, { PropTypes } from 'react';
var TextareaAutosize = require('react-autosize-textarea');

const TextareaInput = React.createClass({

  propTypes: {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    keyName: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.string
  },

  render () {
    return (
        <TextareaAutosize
          type={this.props.type}
          id="test"
          className={this.props.className}
          disabled={this.props.disabled === true ? 'disabled' : null}
          style={this.props.style}
          placeholder={this.props.placeholder}
          defaultValue={this.props.defaultValue}
          value={this.props.value}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur} />
    );
  }
});

export default TextareaInput;
