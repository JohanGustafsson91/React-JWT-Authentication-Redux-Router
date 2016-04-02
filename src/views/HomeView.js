import React from 'react';
import { Link } from 'react-router';

class HomeView extends React.Component {
  render () {
    return (
      <div>
        <h3>This is an authentication boilerplate
          with react, redux and react router.</h3>
        <p><Link to="/login">Login</Link> to get access
          to your <Link to="/profile">profile</Link> page!</p>
      </div>
    );
  }
}

export default HomeView;
