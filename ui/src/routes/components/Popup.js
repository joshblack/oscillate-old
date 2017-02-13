import React from 'react';
import { parse} from '../utilities/query';

const features = [
  'menubar',
  // 'resizable',
  'scrollable',
  'status',
  'width=500',
  'height=400',
].join(',');


export default class Popup extends React.Component {
  componentDidMount() {
    const { title, url } = this.props;

    window.addEventListener('message', this._handleMessage, false);
    this._window = window.open(url, title, features);
  }

  render() {
    return this.props.children;
  }

  _handleMessage = (e) => {
    // TODO: Replace with process.env value for GraphQL Service
    if (e.origin !== 'http://localhost:4000' || !e.isTrusted) {
      return;
    }

    this.props.onClose(e.data);
  }
}
