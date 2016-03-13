import React, { PropTypes } from 'react';
import CheckBox from './CheckBox';

/**
 * Radio Group component.
 *
 * @author Johan Gustafsson <johan.gustafsson@solidio.se>
 */
const RadioGroup = React.createClass({

  propTypes: {
    options: PropTypes.array.isRequired,
    selectNewOption: PropTypes.func.isRequired,
    selectedOption: PropTypes.object,
    checkBoxClass: PropTypes.string.isRequired,
    style: PropTypes.string
  },

  render () {
    let options = this.props.options.map((o) => {
      // Check if current is the selected
      let selected = o.id === this.props.selectedOption.id;

      return (
        <div
          className={this.props.checkBoxClass}
          style={this.props.style}
          key={o.id} >

          <CheckBox
            id={o.id}
            text={o.name}
            onClick={() => this.props.selectNewOption(o)}
            checked={selected} />

        </div>
      );
    });

    return (
      <div className="row">
        {options}
      </div>
    );
  }
});

export default RadioGroup;
