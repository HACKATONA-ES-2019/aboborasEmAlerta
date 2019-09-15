import { SET_USER_DATA } from './actions';

const defaultState = {
  data: {},
}

export default function user(state = defaultState, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
}