import React, { PropTypes } from 'react';

const TextInput = React.createClass({

  propTypes: {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    keyName: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.string
  },

  render () {
    return (
      <input
        type={this.props.type}
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

export default TextInput;
