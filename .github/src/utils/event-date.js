import dayjs from 'dayjs';

const HOUR_MINUTES_COUNT = 60;
const TOTAL_DAY_MINUTES_COUNT = 1440;
const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME_FORMAT = 'DD/MM/YY HH:MM';
const TIME_FORMAT = 'HH:MM';

const defaultPointDate = (date) => dayjs(date).format('DD MMM');
const getDaysOutput = (days) => days <= 0 ? '' : `${`${days}`.padStart(2, '0')}D`;
const getHoursOutput = (days, hoursRest) => (days <= 0 && hoursRest <= 0) ? '' : `${`${hoursRest}`.padStart(2, '0')}H`;
const getMinutesOutput = (minutesRest) => `${`${minutesRest}`.padStart(2, '0')}M`;
const getDate = (date) => dayjs(date).format(DATE_FORMAT);
const getTime = (date) => dayjs(date).format(TIME_FORMAT);
const dateTimeGet = (date) => dayjs(date).format(DATE_TIME_FORMAT);
const isPointDateInProgress = (dateFrom, dateTo) => dayjs().diff(dateFrom, 'minute') > 0 && dayjs().diff(dateTo, 'minute') < 0;
const isPointDateInPast = (dateTo) => dayjs().diff(dateTo, 'minute') > 0;
const isPointDateInFuture = (dateFrom) => dayjs().diff(dateFrom, 'minute') <= 0;

const continuance = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const difference = end.diff(start, 'minute');

  const days = Math.floor(difference / TOTAL_DAY_MINUTES_COUNT);
  const hoursRest = Math.floor((difference - days * TOTAL_DAY_MINUTES_COUNT) / HOUR_MINUTES_COUNT);
  const minutesRest = difference - (days * TOTAL_DAY_MINUTES_COUNT + hoursRest * HOUR_MINUTES_COUNT);

  const outPutDays = getDaysOutput(days);
  const ouputHours = getHoursOutput(days, hoursRest);
  const outputMinutes = getMinutesOutput(minutesRest);

  return `${outPutDays} ${ouputHours} ${outputMinutes}`;
};

export {defaultPointDate, continuance, getDate, dateTimeGet, getTime, isPointDateInPast, isPointDateInFuture, isPointDateInProgress};
