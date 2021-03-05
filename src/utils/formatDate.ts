const ensureTwoDigits = (value: string) => (value.length < 2 ? `0${value}` : value);
const formatDate = (date: Date) : string => {
  let month = `${date.getMonth() + 1}`;
  let day = `${date.getDate()}`;
  const year = date.getFullYear();

  if (month.length < 2) month = ensureTwoDigits(month);
  if (day.length < 2) day = ensureTwoDigits(day);

  return `${year}-${month}-${day}`;
};

export const formatDateTime = (date: Date) : string => {
  const convertedDate = formatDate(date);
  const hour = ensureTwoDigits(`${date.getHours()}`);
  const minutes = ensureTwoDigits(`${date.getMinutes()}`); // date.getMinutes();
  const seconds = ensureTwoDigits(`${date.getSeconds()}`); // date.getSeconds();

  return `${convertedDate} ${hour}:${minutes}:${seconds}`;
};

export default formatDate;
