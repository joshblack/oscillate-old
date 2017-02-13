import React from 'react';
import Relay from 'react-relay';
import Loader from '../../components/Loader';
import Popup from './Popup';

const authTokenKey = 'oscillate:authToken';

export default class AuthProvider extends React.Component {
  static childContextTypes = {
    token: React.PropTypes.string,
  }

  state = {
    token: null,
  }

  getChildContext() {
    return {
      token: this.state.token,
    };
  }

  componentWillMount() {
    const token = localStorage.getItem(authTokenKey);

    if (token === null) {
      return;
    }

    this.setState({ token });

    Relay.injectNetworkLayer(
      new Relay.DefaultNetworkLayer('/graphql', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }

  render() {
    if (!this.state.token) {
      return (
        <Popup
          title="OAuth"
          url="http://localhost:4000/auth/github"
          onClose={this._onClose}>
          <Loader active={true} />
        </Popup>
      );
    }

    return (
      <div>
        <button onClick={this._onLogout}>Logout</button>
        {this.props.children}
      </div>
    );
  }

  _onClose = (token) => {
    localStorage.setItem(authTokenKey, token);

    Relay.injectNetworkLayer(
      new Relay.DefaultNetworkLayer('/graphql', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );

    this.setState({ token });
  }

  _onLogout = () => {
    localStorage.removeItem(authTokenKey);

    this.setState({ token: null });
  }
}
