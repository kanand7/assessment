import { Symbols } from '../store/types';

const parseSymbols = (payload: Record<string, string>) : Symbols[] => Object.entries(payload).map(([symbol, name]) => ({ label: name, value: symbol }));

export default parseSymbols;
