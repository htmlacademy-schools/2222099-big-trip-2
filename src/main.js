import Presenter from './presenter/presenter.js';
import { render } from './render.js';
import ViewSort from './view/sorting.js';
import ViewFilter from './view/filters.js';
import ViewMenu from './view/menu.js';

const menuContainer = document.querySelector('.trip-controls__navigation');
const filtersContainer = document.querySelector('.trip-controls__filters');
const presenterTripList = document.querySelector('.trip-events');
const tripListPresenter = new Presenter({container : presenterTripList});

render(new ViewMenu(), menuContainer);
render(new ViewSort(), presenterTripList);
render(new ViewFilter(), filtersContainer);
tripListPresenter.init();