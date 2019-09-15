import { START_LOADING, STOP_LOADING } from './actions';

const defaultState = {
  isLoading: false,
}

export default function loading(state = defaultState, action) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case STOP_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state;
  }
}