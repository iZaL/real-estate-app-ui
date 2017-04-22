import {AsyncStorage} from 'react-native';

export const setItem = (key, value) => AsyncStorage.setItem(key, value);
export const getItem = key => AsyncStorage.getItem(key);
export const forgetItem = key => AsyncStorage.removeItem(key);
