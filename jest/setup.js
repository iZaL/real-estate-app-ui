/* eslint-env jest */

// See https://github.com/facebook/jest/issues/2208
jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn().mockImplementation((value: string) => Promise.resolve(value)),
}));

// See https://github.com/facebook/react-native/issues/11659
jest.mock('ScrollView', () => {
  const RealComponent = require.requireActual('ScrollView');
  class ScrollView extends RealComponent {
    scrollTo = () => {}
  }
  return ScrollView;
});

class MockStorage {
  constructor(cache = {}) {
    this.storageCache = cache;
  }

  setItem = jest.fn((key, value) => {
    return new Promise((resolve, reject) => {
      return (typeof key !== 'string' || typeof value !== 'string')
        ? reject(new Error('key and value must be string'))
        : resolve(this.storageCache[key] = value);
    });
  });

  getItem = jest.fn((key) => {
    return new Promise((resolve) => {
      return this.storageCache.hasOwnProperty(key)
        ? resolve(this.storageCache[key])
        : resolve(null);
    });
  });

  removeItem = jest.fn((key) => {
    return new Promise((resolve, reject) => {
      return this.storageCache.hasOwnProperty(key)
        ? resolve(delete this.storageCache[key])
        : reject('No such key!');
    });
  });

  clear = jest.fn((key) => {
    return new Promise((resolve, reject) =>  resolve(this.storageCache = {}));
  });

  getAllKeys = jest.fn((key) => {
    return new Promise((resolve, reject) => resolve(Object.keys(this.storageCache)));
  });
}

const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);

jest.setMock('AsyncStorage', AsyncStorage);
jest.mock('react-native-maps');