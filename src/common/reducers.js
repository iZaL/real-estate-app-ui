import appReducer from '../app/common/reducer';
import propertyReducer, {propertyHistoryReducer, propertyOptionsReducer} from '../property/common/reducer';
import ormReducer from './ormReducer';
import authReducer from '../auth/common/reducer';
import userReducer from '../user/common/reducer';
import {combineReducers} from 'redux';
import Navigator from './../common/navigator';

const navReducer = (state, action) => {
  const newState = Navigator.router.getStateForAction(action, state);
  return newState || state;
};

const rootReducer = combineReducers({
  navigation: navReducer,
  appReducer,
  authReducer,
  propertyReducer,
  propertyHistoryReducer,
  propertyOptionsReducer,
  ormReducer,
  userReducer,
});

export default rootReducer;
