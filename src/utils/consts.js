import { dateInFuturePoint, dateInPastPoint } from '../utils/event-date.js';

const FavoriteOption = (isFavorite) => (isFavorite) ? 'event__favorite-btn--active' : '';

const FilterType = {
    EVERYTHING: 'everything',
    FUTURE: 'future',
    PAST: 'past'
};
  
const filter = {
    [FilterType.EVERYTHING]: (points) => points,
    [FilterType.FUTURE]: (points) => points.filter((point) => dateInFuturePoint(point.dateFrom)),
    [FilterType.PAST]: (points) => points.filter((point) => dateInPastPoint(point.dateTo)),
};

const filterGenerate = (points) => Object.entries(filter).map(
    ([filterName, filterPoints]) => ({
      name: filterName,
      count: filterPoints(points).length,
    }),
  );

export { FavoriteOption, filter, filterGenerate };