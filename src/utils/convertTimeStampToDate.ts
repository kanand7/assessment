const convertTimeStampToDate = (timeStamp: number): Date => {
  const d = new Date(0);
  d.setUTCSeconds(timeStamp);
  return d;
};

export default convertTimeStampToDate;
