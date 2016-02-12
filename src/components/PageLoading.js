import React from 'react';

/**
 * Page loading component that hides all content on the screen.
 */
const PageLoading = React.createClass({
  render () {
    return (
      <div className='page-loading-wrapper'>
          <div className='sk-folding-cube'>
            <div className='sk-cube1 sk-cube'></div>
            <div className='sk-cube2 sk-cube'></div>
            <div className='sk-cube4 sk-cube'></div>
            <div className='sk-cube3 sk-cube'></div>
          </div>
      </div>
    );
  }
});

export default PageLoading;
