import React from 'react';
import Relay from 'react-relay';

class Entry extends React.Component {
  render() {
    const { viewer } = this.props;

    return (
      <section>
        <header>
          <h1>Entry</h1>
        </header>
        <article>
          <img src={viewer.info.avatarUrl} alt="Avatar Image" />
          <p>({viewer.info.id}) {viewer.info.name} - {viewer.info.email}, {viewer.info.location}</p>
          <p>{viewer.info.bio}</p>
        </article>
      </section>
    );
  }
}

export default Relay.createContainer(Entry, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        info {
          id
          name
          bio
          email
          location
          avatarUrl
        }
      }
    `,
  },
});
