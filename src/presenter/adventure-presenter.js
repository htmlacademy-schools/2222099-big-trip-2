import ViewTripList from '../view/trip-event-list.js';
import Empty from '../view/empty.js';
import { render } from '../framework/render.js';
import WayPointPresenter from './way-presenter.js';

export default class AdventurePresenter {

  #container = null;
  #component = null;
  #pointsModel = null;
  #boardPoints = null;

  #pointsPresenters = new Map();

  constructor(container) {
    this.#container = container;
    this.#component = new ViewTripList();
  }

  init(pointsModel) {
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];

    if(this.#boardPoints.length === 0){
      render(new Empty(), this.#container);
    }
    else{
      render(this.#component, this.#container);
      this.#renderPointList(0, this.#boardPoints.length);
    }
  }

  #handleModeChange = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointsPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint = (point) => {
    const pointPresenter = new WayPointPresenter(this.#component.element, this.#pointsModel, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointsPresenters.set(point.id, pointPresenter);
  };

  #renderPointList = (from, to) => {
    this.#boardPoints.slice(from, to).forEach((point) => this.#renderPoint(point));
  };

  #clearPointList = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
  };

}