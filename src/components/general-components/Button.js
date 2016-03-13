import React, {PropTypes} from 'react';
var classNames = require('classnames');

const Button = React.createClass({

  propTypes: {
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.string,
    baseStyle: PropTypes.string,
    loading: PropTypes.bool,
    style: PropTypes.string,
    disabled: PropTypes.bool
  },

  render () {
    const {text, onClick, icon, baseStyle, loading} = this.props;
    let iconStyles, buttonStyles;
    let iconContent;

    buttonStyles = classNames(baseStyle, {
      'loading': loading,
      'square': !text
    });

    if (icon || loading) {
      iconStyles = classNames('fa ' + (loading ? '' : icon), {
        'fa-refresh fa-spin': loading
      });

      iconContent = (<i className={iconStyles}></i>);
    }

    let textStyle = classNames({
      'textmargin': iconContent
    });

    return (
      <button
        className={buttonStyles}
        style={this.props.style}
        disabled={this.props.disabled === true ? 'disabled' : null}
        onClick={onClick}>
        {text ? <span className={textStyle}>{text} </span> : null}
        {iconContent}
      </button>
    );
  }
});

export default Button;
