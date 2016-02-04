import React, { PropTypes } from 'react';
import classes from '../styles/_stylesheet.scss';

/**
 * Page loading component that hides all content on the screen.
 */
const PageLoading = React.createClass({
  render () {
    return (
      <div className={classes['page-loading-wrapper']}>
        <div className={classes['page-loading-item']}>LADDAR...</div>
      </div>
    );
  }
});

export default PageLoading;
