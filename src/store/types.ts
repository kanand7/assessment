export type FetchSymbol = Record<string, string>;

export type ApplicationContext = {
    loading: boolean;
    symbols: Symbols[];
    history: ConversionDataSet[]
}

export type Symbols = {label: string; value: string};

export type ConversionDataSet = {
    conversionRate: number,
    dateTime: Date;
    date: string;
    from: Symbols;
    to: Symbols;
    amount: number;
};

export type InitialState = {
    loading: boolean;
    symbols: Symbols[];
    history: ConversionDataSet[];
};
