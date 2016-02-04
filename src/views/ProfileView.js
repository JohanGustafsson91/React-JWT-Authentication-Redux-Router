import React, { PropTypes } from 'react';

import classes from '../styles/_stylesheet.scss';
import PageLoading from '../components/PageLoading';

const ProfileView = React.createClass({
  render () {
    return (
      <div>
        <h1>Profile</h1>
        <p><i>This view is protected</i></p>
      </div>
    );
  }
});

export default ProfileView;
