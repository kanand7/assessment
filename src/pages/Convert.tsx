import React, {
  useState, useMemo, useContext, useCallback, useEffect
} from 'react';
import Select from 'react-select';
import Section from '../components/section';
import ApplicationContext, { DispatchContext } from '../store/ApplicationContext';
import { convertAmount } from '../store/services';
import { addSearchToHistory } from '../store/actions/actions';
import { Symbols } from '../store/types';
import ConversionResult from '../components/ConversionResult';
import SelectDate from '../components/SelectDate';
import formatDate from '../utils/formatDate';

type ConversionData = {
    conversionRate: number,
    dateTime: Date;
    date: string;
    from: Symbols;
    to: Symbols;
    amount: number;
};

const Convert = () => {
  const { symbols } = useContext(ApplicationContext);
  const dispatch = useContext(DispatchContext);
  const [amount, setAmount] = useState<number>(1);
  const [amountError, setAmountError] = useState<string>('');
  const [currencyFrom, setCurrencyFrom] = useState<Symbols>(symbols[0]);
  const [currencyTo, setCurrencyTo] = useState<Symbols>(symbols[symbols.length - 1]);
  const [conversionResult, setConversionResult] = useState<ConversionData | null>(null);
  const [activeDate, setActiveDate] = useState<{date: Date, isLatest: boolean}>({ date: new Date(), isLatest: true });

  const formattedDate = useMemo(() => formatDate(activeDate.date), [activeDate.date]);

  useEffect(() => {
    if (symbols.length) {
      setCurrencyFrom(symbols.find(({ value }) => value === 'NOK') || symbols[0]);
      setCurrencyTo(symbols.find(({ value }) => value === 'USD') || symbols[symbols.length - 1]);
    }
  }, [symbols]);

  useEffect(() => {
    if (conversionResult) dispatch(addSearchToHistory(conversionResult));
  }, [conversionResult]);

  useEffect(() => {
    const validInt = (value: number) => value % 1 === 0;
    const isPositiveNumber = (value: number) => value > 0;
    if (validInt(amount) && isPositiveNumber(amount)) {
      setAmountError('');
    } else {
      setAmountError('Invalid Amount ! Should be positive non decimal number');
    }
  }, [amount]);
  const handleChangeTo = useCallback((args) => {
    if (args) setCurrencyTo(args);
  }, []);

  const handleChangeFrom = useCallback((args) => {
    args && setCurrencyFrom(args);
  }, []);

  const handleAmountChange = useCallback((event) => {
    if (event.target.value !== null) setAmount(event.target.value);
  }, []);

  const handleOnSubmit = useCallback(() => {
    const date = activeDate?.isLatest ? 'latest' : formattedDate;
    convertAmount({ from: currencyFrom?.value, to: currencyTo?.value, date }).then((data) => {
      data?.conversionRate && setConversionResult({
        ...data, from: currencyFrom, to: currencyTo, amount
      });
    });
  }, [currencyFrom, currencyTo, amount, formattedDate, activeDate]);

  return (
    <Section>
      <Section.Header>
        Convert ?
        <SelectDate onChange={setActiveDate} />
      </Section.Header>
      <Section.Body>
        <div className="form">
          <div className="form__field">
            <span>AMOUNT</span>
            <input type="number" value={amount} onChange={handleAmountChange} min="0" />
          </div>
          <div className="form__field">
            <span>FROM</span>
            <Select options={symbols} value={currencyFrom} onChange={handleChangeFrom} />
          </div>
          <div className="form__field">
            <span>TO</span>
            <Select options={symbols} value={currencyTo} onChange={handleChangeTo} />
          </div>
          <button type="submit" disabled={!!amountError} onClick={handleOnSubmit} className="active"> &gt; </button>
        </div>
        {amountError && <span className="form__error-text">{amountError}</span>}
        {conversionResult
          && (
            <ConversionResult
              to={conversionResult.to}
              from={conversionResult.from}
              amount={conversionResult.amount}
              dateTime={conversionResult.dateTime}
              conversionRate={conversionResult?.conversionRate}
            />
          )
        }
      </Section.Body>
    </Section>
  );
};

export default Convert;
