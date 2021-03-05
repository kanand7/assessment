import * as actionTypes from './actions/actionTypes';
import Action from './actions/actionTypes';
import { InitialState } from './types';
import parseSymbols from '../utils/parseSymbols';

export const initialState: InitialState = {
  loading: false,
  symbols: [],
  history: []
};

const reducer = (state = initialState, action: Action): InitialState => {
  switch (action.type) {
  case actionTypes.TOGGLE_LOADING: {
    return {
      ...state,
      loading: action.payload
    };
  }
  case actionTypes.SET_SYMBOLS: {
    const symbols = parseSymbols(action.payload);
    return {
      ...state,
      symbols
    };
  }
  case actionTypes.ADD_HISTORY: {
    return {
      ...state,
      history: [
        { ...action.payload },
        ...state.history
      ]
    };
  }
  default:
    return state;
  }
};

export default reducer;
