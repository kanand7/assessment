import Action, { TOGGLE_LOADING, SET_SYMBOLS, ADD_HISTORY } from './actionTypes';
import { FetchSymbol, ConversionDataSet } from '../types';

export const setLoading = (payload: boolean): Action => ({ type: TOGGLE_LOADING, payload });
export const setSymbols = (payload: FetchSymbol): Action => ({ type: SET_SYMBOLS, payload });
export const addSearchToHistory = (payload: ConversionDataSet): Action => ({ type: ADD_HISTORY, payload });
