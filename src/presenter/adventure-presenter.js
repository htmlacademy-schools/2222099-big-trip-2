import ViewTripList from '../view/trip-event-list.js';
import Empty from '../view/empty.js';
import WayPointPresenter from './way-presenter.js';
import ViewSort from '../view/sorting.js';
import { SortType } from '../utils/consts.js';
import { render } from '../framework/render.js';
import { itemUpdate } from '../utils/consts.js';
import { sortDay, sortTime, sortPrice } from '../utils/event-date.js';

export default class AdventurePresenter {

  #container = null;
  #component = null;
  #pointsModel = null;
  #boardPoints = null;

  #pointsPresenters = new Map();
  #currentSortType = null;
  #sourcedBoardPoints = [];

  #sortComponent = new ViewSort();

  constructor(container) {
    this.#container = container;
    this.#component = new ViewTripList();
  }

  init(pointsModel) {
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];
    this.#sourcedBoardPoints = [...this.#pointsModel.points];

    if(this.#boardPoints.length === 0){
      render(new Empty(), this.#container);
    }
    else{
      this.#renderSort()
      render(this.#component, this.#container);
      this.#renderPointList(0, this.#boardPoints.length);
    }
  }

  #handleModeChange = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = itemUpdate(this.#boardPoints, updatedPoint);
    this.#pointsPresenters.get(updatedPoint.id).init(updatedPoint);
    this.#sourcedBoardPoints = itemUpdate( this.#sourcedBoardPoints, updatedPoint);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoint(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderPoint = (point) =>{
    const pointPresenter = new WayPointPresenter(this.#component.element, this.#pointsModel, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointsPresenters.set(point.id, pointPresenter);
  };

  #renderPointList = (from, to) =>{
    this.#boardPoints.slice(from, to).forEach((point) => this.#renderPoint(point));
  };

  #renderSort = () =>{
    this.#boardPoints.sort(sortDay);
    render(this.#sortComponent, this.#container);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #clearPointList = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
  };

  #sortPoint = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#boardPoints.sort(sortDay);
        break;
      case SortType.TIME:
        this.#boardPoints.sort(sortTime);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortPrice);
        break;
    }

    this.#currentSortType = sortType;
  };

}
