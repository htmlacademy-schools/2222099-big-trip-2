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


export { defaultPointDate, continuance, date, time, dateTime };
