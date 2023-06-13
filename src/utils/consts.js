import { dateInFuturePoint, dateInPastPoint } from '../utils/event-date.js';

const FavoriteOption = (isFavorite) => (isFavorite) ? 'event__favorite-btn--active' : '';

const filterType = {
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

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  destinationId: 0,
  isFavorite: false,
  offerIds: [],
  type: POINT_TYPES[0],
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


export { FavoriteOption, mode, SortType, filter, BLANK_POINT, filterGenerate, itemUpdate, firstLetterUp };