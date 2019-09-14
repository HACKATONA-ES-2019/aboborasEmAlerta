 
import { combineReducers } from 'redux';
import loading from './loading/reducer';
import disasters from './disaster/reducer';

const rootReducer = combineReducers({
  loading,
  disasters
});

export default rootReducer;