import React, {
  useState, MouseEvent, useEffect, useMemo
} from 'react';
import Calendar from 'react-calendar';
import formatDate from '../utils/formatDate';

type SelectDateProps = {
    onChange: (args:{date: Date, isLatest: boolean}) => void;
};

const defaultDate = new Date();
const SelectDate = ({ onChange }: SelectDateProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [value, setValueChange] = useState<Date>(defaultDate);

  const isLatest = useMemo(() => formatDate(value) === formatDate(defaultDate), [value]);
  useEffect(() => {
    onChange({ date: value, isLatest });
  }, [value, isLatest]);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setActive(true);
  };
  const handleDateSelect = (date: Date | Date[]) => {
    const selectedDate = Array.isArray(date) ? date[0] : date;
    setValueChange(selectedDate);
    setActive(false);
    onChange({ date: selectedDate, isLatest });
  };

  const handleLatestClick = (e: MouseEvent) => {
    e.preventDefault();
    setValueChange(defaultDate);
    setActive(false);
  };

  return (
    <div>
      { isLatest
        ? (
          <span>
            Today !
            <button type="button" onClick={handleClick}>click to check for previous date</button>
          </span>
        )
        : (
          <div>
            <button type="button" onClick={handleClick}>{formatDate(value)}</button>
                        &nbsp;
            <button type="button" onClick={handleLatestClick}>Try Latest</button>
          </div>
        )
      }
      {active && (
        <div>
          <Calendar className="calendar" value={value} onChange={handleDateSelect} maxDate={new Date()} />
        </div>
      )
      }
    </div>

  );
};

export default SelectDate;
