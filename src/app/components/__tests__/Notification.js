import React from 'react';
import renderer from 'react-test-renderer';
import Notification from '../Notification';

test('renders Notification Component', () => {
  const tree = renderer.create(<Notification actions={{}} message="error message" messageType="error" />);
  expect(tree).toMatchSnapshot();
});
