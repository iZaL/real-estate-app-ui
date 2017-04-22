import React from 'react';
import renderer from 'react-test-renderer';
import LoginScene from './../LoginScene';

test('renders Notification Component', () => {
  const tree = renderer.create(
    <LoginScene
      handleForgotPasswordRoute={() => {}}
      handleRegisterRoute={() => {}}
      handleLogin={() => {}}
      onFieldChange={() => {}}
      email="z4ls@live.com"
      password="password"
      busy={false}
    />,
  );
  expect(tree).toMatchSnapshot();
});
