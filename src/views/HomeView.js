import React from 'react';
import { Link } from 'react-router';

const HomeView = React.createClass({
  render () {
    return (
      <div>
        <h1>Welcome solid friend!</h1>
        <p>This is the authentication boilerplate
          with react, redux and react router.</p>
        <p><Link to='/login'>Login</Link> to get access
          to your <Link to='/profile'>profile</Link> page!</p>
      </div>
    );
  }
});

export default HomeView;
