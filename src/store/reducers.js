import { combineReducers } from 'redux';
import loading from './loading/reducer';
import disasters from './disaster/reducer';
import user from './user/reducers';

const rootReducer = combineReducers({
  loading,
  disasters,
  user,
});

export default rootReducer;
