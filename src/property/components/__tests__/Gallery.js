import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Gallery from './../Gallery';

test('renders heart', () => {
  const tree = renderer
    .create(
      <Gallery
        images={['http://hello.com/test.png']}
        setSceneType={() => {}}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
