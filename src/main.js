import ViewFilters from './view/filters.js';
import Presenter from './presenter/presenter.js';
import WayPointsModel from './model/waypoint-model.js';
import ViewMenu from './view/menu.js';
import ViewSort from './view/sorting.js';
import { render } from './render.js';
import { getAllPoints, getEndPoints, typeOffersGet } from './mock/waypoint.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new Presenter(tripContainer);

const points = getAllPoints();
const destinations = getEndPoints();
const offersByType = typeOffersGet();
const wayPointsModel = new WayPointsModel();

render(new ViewMenu(), filterContainer);
render(new ViewSort(), tripContainer);
render(new ViewFilters(), filterContainer);

wayPointsModel.init(points, destinations, offersByType);
tripPresenter.init(wayPointsModel);