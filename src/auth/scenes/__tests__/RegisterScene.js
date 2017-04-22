import React from 'react';
import renderer from 'react-test-renderer';
import RegisterScene from './../RegisterScene';

test('renders Notification Component', () => {
  const tree = renderer.create(
    <RegisterScene
      handleRegister={() => {}}
      handleLoginRoute={() => {}}
      onFieldChange={() => {}}
      name="zal"
      email="z4ls@live.com"
      mobile="97978803"
      password="testpassword"
      busy={false}
    />,
  );
  expect(tree).toMatchSnapshot();
});
