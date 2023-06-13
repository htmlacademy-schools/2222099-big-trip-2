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
}
  
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

export { FavoriteOption, mode, filter, filterGenerate, itemUpdate };