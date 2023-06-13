import ModelDestinations from './model/destinations-model.js';
import PointsApiService from './service/points-service.js';
import NewPointButtonPresenter from './presenters/new-waypoint-button-presenter.js';
import WayPointModel from './model/waypoint-model.js';
import FilterPresenter from './presenters/filter-presenter.js';
import ModelFilter from './model/filter-model.js';
import DestinationsApiService from './service/destinations-service.js';
import OffersApiService from './service/offers-service.js';
import AdventurePresenter from './presenters/adventure-presenter.js';
import ModelOffer from './model/offers-model.js';
import { render } from './framework/render.js';

const AUTHORIZATION = 'Basic nifFYvo4532';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const siteHeaderElement = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const menuContainer = document.querySelector('.trip-controls__navigation');
const tripInfoContainer = document.querySelector('.trip-main__trip-info');

const pointsModel = new WayPointModel(new PointsApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new ModelDestinations(new DestinationsApiService(END_POINT, AUTHORIZATION));
const offersModel = new ModelOffer(new OffersApiService(END_POINT, AUTHORIZATION));
const filterModel = new ModelFilter();

const tripPresenter = new AdventurePresenter({
  tripInfoContainer: tripInfoContainer,
  tripContainer: tripContainer,
  pointsModel: pointsModel,
  filterModel: filterModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel
});
tripPresenter.init();

offersModel.init().finally(() => {
  destinationsModel.init().finally(() => {
    pointsModel.init().finally(() => {
      newPointButtonPresenter.renderNewPointButton();
    });
  });
});

const newPointButtonPresenter = new NewPointButtonPresenter({
  newPointButtonContainer: siteHeaderElement,
  destinationsModel: destinationsModel,
  offersModel: offersModel,
  tripPresenter: tripPresenter
});
newPointButtonPresenter.init();

const filterPresenter = new FilterPresenter({
  filterContainer: filterContainer,
  pointsModel: pointsModel,
  filterModel: filterModel
});
filterPresenter.init();