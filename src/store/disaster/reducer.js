import {UPDATE_DISASTERS} from './actions';

const initialState = {
  disasters: []
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DISASTERS:
      return { ...state, disasters: [ ...action.payload ] };
    default:
      return state;
  }
}

export default reducer