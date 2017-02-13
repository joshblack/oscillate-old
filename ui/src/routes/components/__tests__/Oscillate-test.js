import React from 'react';
import renderer from 'react-test-renderer';
import Oscillate from '../Oscillate';

describe('Oscillate Component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Oscillate />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
