import { render } from '../framework/render.js';
import ViewWayPointNewButtom from '../view/new-waypoint-button-view.js';

export default class NewPointButtonPresenter {
  #tripPresenter = null;

  #destinationsModel = null;
  #offersModel = null;

  #newPointButtonContainer = null;
  #newPointButtonComponent = null;

  constructor({newPointButtonContainer, destinationsModel, offersModel, tripPresenter}) {
    this.#newPointButtonContainer = newPointButtonContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#tripPresenter = tripPresenter;
  }

  init() {
    this.#newPointButtonComponent = new ViewWayPointNewButtom();
  }

  renderNewPointButton = () => {
    render(this.#newPointButtonComponent, this.#newPointButtonContainer);
    this.#newPointButtonComponent.setClickHandler(this.#handleNewPointButtonClick);
    if (this.#offersModel.offers.length === 0 || this.#destinationsModel.destinations.length === 0) {
      this.#newPointButtonComponent.element.disabled = true;
    }
  };

  #handleNewPointButtonClick = () => {
    this.#tripPresenter.createPoint(this.#handleNewPointFormClose);
    this.#newPointButtonComponent.element.disabled = true;
  };

  #handleNewPointFormClose = () => {
    this.#newPointButtonComponent.element.disabled = false;
  };
}
