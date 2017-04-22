import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import UploadImage from './../UploadImage';

test('renders UploadImage', () => {
  const tree = renderer.create(<UploadImage images={['a.png']} updateImage={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
