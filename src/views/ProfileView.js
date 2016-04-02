import React, { PropTypes } from 'react';

class ProfileView extends React.Component {
  render () {
    return (
      <div>
        <h1>Profile</h1>
        <p><i className="fa fa-lock"></i> This view is protected</p>
      </div>
    );
  }
}

export default ProfileView;
