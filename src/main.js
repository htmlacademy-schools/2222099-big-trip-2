import ViewFilters from './view/filters.js';
import Presenter from './presenter/presenter.js';
import WayPointsModel from './model/waypoint-model.js';
import ViewMenu from './view/menu.js';
import { render } from './framework/render.js';
import { getAllPoints, getEndPoints, typeOffersGet } from './mock/waypoint.js';

const menuContainer = document.querySelector('.trip-controls__navigation');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new Presenter(tripContainer);

const points = getAllPoints();
const destinations = getEndPoints();
const offersByType = typeOffersGet();
const wayPointsModel = new WayPointsModel();

render(new ViewMenu(), menuContainer);
render(new ViewFilters(), filterContainer);

wayPointsModel.init(points, destinations, offersByType);
tripPresenter.init(wayPointsModel);