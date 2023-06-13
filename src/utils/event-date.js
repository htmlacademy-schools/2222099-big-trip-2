import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'DD/MM/YY HH:MM';
const DATE_FORMAT = 'YYYY/MM/DD';
const HOUR_MINUTES_COUNT = 60;
const TIME_FORMAT = 'HH:MM';
const TOTAL_DAY_MINUTES_COUNT = 1440;

const defaultPointDate = (date) => dayjs(date).format('DD MMM');

const continuance = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const difference = end.diff(start, 'minute');

  const days = Math.floor(difference / TOTAL_DAY_MINUTES_COUNT);
  const restHours = Math.floor((difference - days * TOTAL_DAY_MINUTES_COUNT) / HOUR_MINUTES_COUNT);
  const restMinutes = difference - (days * TOTAL_DAY_MINUTES_COUNT + restHours * HOUR_MINUTES_COUNT);

  const daysOutput = (days) ? `${days}D` : '';
  const hoursOutput = (restHours) ? `${restHours}H` : '';
  const minutesOutput = (restMinutes) ? `${restMinutes}M` : '';

  return `${daysOutput} ${hoursOutput} ${minutesOutput}`;
};


const date = (date) => dayjs(date).format(DATE_FORMAT);
const time = (date) => dayjs(date).format(TIME_FORMAT);
const dateTime = (date) => dayjs(date).format(DATE_TIME_FORMAT);
const dateInPastPoint = (dateTo) => dateTo.isBefore(dayjs());
const dateInFuturePoint = (dateFrom) => dateFrom.isAfter(dayjs());
const dateNowPoint = (dateFrom, dateTo) => dateFrom.isBefore(dayjs()) && dateTo.isAfter(dayjs());

const sortPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortTime = (pointA, pointB) => {
  const timePointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timePointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return timePointB - timePointA;
};

export { defaultPointDate, continuance, date, time, dateTime, dateInPastPoint, dateInFuturePoint, dateNowPoint, sortPrice, sortDay, sortTime };
