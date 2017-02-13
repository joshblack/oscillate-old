import React from 'react';
import renderer from 'react-test-renderer';
import Loader from '../Loader';

describe('Loader component', () => {
  it('should render', () => {
    const active = renderer.create(
      <Loader active={true} />
    ).toJSON();
    expect(active).toMatchSnapshot();

    const exit = renderer.create(
      <Loader active={false} />
    ).toJSON();
    expect(exit).toMatchSnapshot();
  });
});
