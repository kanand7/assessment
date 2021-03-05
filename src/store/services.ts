import qs from 'querystring';
import { FetchSymbol } from './types';
import roundNumber from '../utils/roundNumber';
import convertTimeStampToDate from '../utils/convertTimeStampToDate';

const BASE_URL = 'http://data.fixer.io/api/';
const baseParams = { access_key: '4355e5e9cc2a9aad86b6bf2cbb8ed993' };
const getUrl = (path: string, params = '') => BASE_URL.concat(path, '?', params);


type SymbolsResponse = {
    success: boolean;
    symbols: FetchSymbol;
};

type LatestRatesResponse = {
    base: string;
    date: string;
    rates: Record<string, number>;
    success: boolean;
    timestamp: number;
}

type ConvertedAmount = {
    conversionRate: number,
    dateTime: Date;
    date: string;
};

type ConvertAmountRequest = {from: string, to: string, date?: string};


export const fetchAllSymbols = async () : Promise<FetchSymbol | undefined> => {
  try {
    const response = await fetch(getUrl('symbols', qs.stringify(baseParams)));
    const data = await response.json().then(data => data as SymbolsResponse);
    if (!data.success) {
      throw new Error('Missing / invalid access type');
    }
    return data.symbols;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const convertAmount = async ({ from, to, date }: ConvertAmountRequest) : Promise<ConvertedAmount | undefined> => {
  try {
    const params = qs.stringify({
      ...baseParams,
      symbols: `${from}, ${to}`
    });

    const response = await fetch(getUrl(date || 'latest', params));
    const data = await response.json().then(data => data as LatestRatesResponse);
    if (!data.success) {
      throw new Error('Missing / invalid access type');
    }

    const rate = data?.rates[to] / data?.rates[from];
    const dateTime = convertTimeStampToDate(data?.timestamp);

    return {
      conversionRate: Number(roundNumber(rate)),
      dateTime,
      date: data?.date
    };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
