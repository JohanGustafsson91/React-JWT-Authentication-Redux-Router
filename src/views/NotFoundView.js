import React from 'react';
import { Link } from 'react-router';

const NotFoundView = React.createClass({
  render () {
    return (
      <div className="container text-center">
        <h1>This is a demo 404 page!</h1>
        <hr />
        <Link to="/">Back To Home View</Link>
      </div>
    );
  }
});

export default NotFoundView;
