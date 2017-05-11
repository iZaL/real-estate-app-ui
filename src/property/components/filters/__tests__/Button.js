import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Button from './../Button';

test('renders Button', () => {
  const tree = renderer
    .create(
      <Button
        title="Button"
        onPress={() => {}}
        selected="a"
        range={['1', '2']}
        icon="music"
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
