import { dateInFuturePoint, dateInPastPoint } from '../utils/event-date.js';
import dayjs from 'dayjs';

const FavoriteOption = (isFavorite) => (isFavorite) ? 'event__favorite-btn--active' : '';

const FilterType = {
    EVERYTHING: 'everything',
    FUTURE: 'future',
    PAST: 'past'
};

const mode = {
  PREVIEW: 'preview',
  EDITING: 'editing'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const sortPricePoint = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortDayPoint = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortTimePoint = (pointA, pointB) => {
  const timePointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timePointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return timePointB - timePointA;
};

const sorting = {
  [SortType.DAY]: (points) => points.sort(sortDayPoint),
  [SortType.TIME]: (points) => points.sort(sortTimePoint),
  [SortType.PRICE]: (points) => points.sort(sortPricePoint)
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};
  
const filter = {
    [filterType.EVERYTHING]: (points) => points,
    [filterType.FUTURE]: (points) => points.filter((point) => dateInFuturePoint(point.dateFrom)),
    [filterType.PAST]: (points) => points.filter((point) => dateInPastPoint(point.dateTo)),
};

const filterGenerate = (points) => Object.entries(filter).map(
    ([filterName, filterPoints]) => ({
      name: filterName,
      count: filterPoints(points).length,
    }),
);


const itemUpdate = (items, update) => {
    const index = items.findIndex((item) => item.id === update.id);
  
    if (index === -1) {
      return items;
    }
  
    return [
      ...items.slice(0, index),
      update,
      ...items.slice(index + 1),
    ];
};

const firstLetterUp = (value) =>{
  if ( value === '' || value === null){
    return value;
  }

  const firstLetter = value[0].toUpperCase();
  const remainingPart = value.slice(1);
  return firstLetter + remainingPart;
};

export { UserAction, FavoriteOption, FilterType, mode, SortType, filter, filterGenerate, itemUpdate, firstLetterUp, UpdateType, sorting };
