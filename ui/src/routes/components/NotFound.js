import React from 'react';
import { Link } from 'react-router';

export default class NotFound extends React.Component {
  render() {
    return (
      <section>
        <p>Route not found</p>
        <Link to="/">Go back Home</Link>
      </section>
    );
  }
}
