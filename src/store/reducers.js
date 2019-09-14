 
import { combineReducers } from 'redux';
import loading from './loading/reducer';

const rootReducer = combineReducers({
  loading,
});

export default rootReducer;