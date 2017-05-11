import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import UploadVideo from './../UploadVideo';

test('renders UploadVideo', () => {
  const tree = renderer
    .create(<UploadVideo onFieldChange={() => {}} video={null} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
