import ViewFilters from './view/filters.js';
import AdventurePresenter from './presenter/adventure-presenter.js';
import WayPointsModel from './model/waypoint-model.js';
import ViewMenu from './view/menu.js';
import { render } from './framework/render.js';
import { getAllPoints, getEndPoints, typeOffersGet } from './mock/waypoint.js';
import { filterGenerate } from './utils/consts.js';

const menuContainer = document.querySelector('.trip-controls__navigation');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new AdventurePresenter(tripContainer);

const points = getAllPoints();
const destinations = getEndPoints();
const offersByType = typeOffersGet();
const wayPointsModel = new WayPointsModel();
const filters = filterGenerate(points);

render(new ViewMenu(), menuContainer);
render(new ViewFilters(filters), filterContainer);

wayPointsModel.init(points, destinations, offersByType);
tripPresenter.init(wayPointsModel);