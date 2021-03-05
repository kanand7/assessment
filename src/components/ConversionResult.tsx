import React from 'react';
import { Symbols } from '../store/types';
import roundNumber from '../utils/roundNumber';

type ConversionResultProps = {
    from: Symbols;
    to: Symbols;
    dateTime: Date;
    conversionRate: number;
    amount: number;
};

const ConversionResult = ({
  from, to, dateTime, conversionRate, amount
}: ConversionResultProps) => {
  const convertedText = `${amount} ${from.label} = ${roundNumber(amount * conversionRate)} ${to.label}`;
  const baseRateText = `( 1 ${from.value} = ${roundNumber(amount * conversionRate)} ${to.value} )`;
  return (
    <section className="conversion-result">
      <h2>Result: </h2>
      <div className="conversion-result__value">
        <h3 className="conversion-result__value-conversion">{convertedText}</h3>
        <h4 className="conversion-result__value-base">{baseRateText}</h4>
      </div>
      <div className="conversion-result__note">
        <span>Updated at : </span>
        <span className="conversion-result__note-time">{dateTime.toString()}</span>
      </div>
    </section>
  );
};

export default ConversionResult;
