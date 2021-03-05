import { FetchSymbol, ConversionDataSet } from '../types';

export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const SET_SYMBOLS = 'SET_SYMBOLS';
export const ADD_HISTORY = 'ADD_HISTORY';

type ToggleLoading = {
    type: typeof TOGGLE_LOADING;
    payload: boolean;
};

type SetSymbols = {
    type: typeof SET_SYMBOLS;
    payload: FetchSymbol;
};

type AddHistory = {
    type: typeof ADD_HISTORY;
    payload: ConversionDataSet;
};

type Action =
    | SetSymbols
    | AddHistory
    | ToggleLoading;

export default Action;
