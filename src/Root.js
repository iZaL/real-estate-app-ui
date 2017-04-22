import React from 'react';
import Store from './common/store';
import App from './app/App';
import {Provider} from 'react-redux';

const Root = () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};

export default Root;
