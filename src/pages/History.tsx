import React, { useMemo, useContext } from 'react';
import Table from 'rc-table';
import Section from '../components/section';
import ApplicationContext from '../store/ApplicationContext';
import { formatDateTime } from '../utils/formatDate';
import roundNumber from '../utils/roundNumber';
import 'rc-table/assets/index.css';

const emptyText = 'Unfortunately! No Historical data to show';
const columns = [
  {
    title: 'Currency Codes',
    dataIndex: 'currency',
    key: 'currency',
    width: 100
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    width: 100
  },
  {
    title: 'Converted Amount',
    dataIndex: 'convertedAmount',
    key: 'convertedAmount',
    width: 100
  },
  {
    title: 'Exchange Date',
    dataIndex: 'searchedDateTime',
    key: 'searchedDateTime',
    width: 100
  }
];

const History = () => {
  const { history } = useContext(ApplicationContext);

  const data = useMemo(() => history.map((data, index) => ({
    key: index,
    currency: `${data.from.value} / ${data.to.value}`,
    amount: `${data.amount} ${data.from.value}`,
    convertedAmount: `${roundNumber(data.conversionRate * data.amount)} ${data.to.value}`,
    searchedDateTime: formatDateTime(data.dateTime)
  })), [history]);

  return (
    <Section>
      <Section.Header>
        Your search history !
        {history.length ? (
          <p>
            {`Results (${history.length})`}
          </p>
        ) : ''}
      </Section.Header>
      <Section.Body>
        <Table emptyText={emptyText} columns={columns} data={data} className="history" />
      </Section.Body>
    </Section>
  );
};

export default History;
