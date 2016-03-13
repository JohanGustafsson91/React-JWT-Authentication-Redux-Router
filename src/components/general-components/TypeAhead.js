import React, { PropTypes } from 'react';
import Select from 'react-select';

/**
 * Typeahead component.
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
const TypeAhead = React.createClass({

  propTypes: {
    apiUrl: PropTypes.string.isRequired,
    noResultsText: PropTypes.string,
    placeholder: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    multiple: PropTypes.bool,
    autoBlur: PropTypes.bool
  },

  render () {
    return (
      <div>
        <Select.Async
          multi={this.props.multiple}
          autoBlur={this.props.autoBlur}
          placeholder={this.props.placeholder}
          noResultsText={this.props.noResultsText}
          loadOptions={this.props.search}
          onChange={(val) => {
            this.props.handleChange(val);
          }} />
      </div>
    );
  }
});

export default TypeAhead;
