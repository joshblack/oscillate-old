import React from 'react';
import AuthProvider from './AuthProvider';

export default class Oscillate extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return (
      <div>
        <div>
          <h1>Oscillate</h1>
        </div>
        <AuthProvider>
          {this.props.children}
        </AuthProvider>
      </div>
    );
  }
}
