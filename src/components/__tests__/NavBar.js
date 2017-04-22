import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NavBar from './../NavBar';
import {Text} from 'react-native';

test('renders null', () => {
  const tree = renderer
    .create(<NavBar left={<Text>left icon</Text>} middle={<Text>title</Text>} right={<Text>right icon</Text>} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
