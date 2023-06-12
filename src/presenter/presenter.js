import ViewTripList from '../view/trip-event-list.js';
import ViewWayPoint from '../view/event-item.js';
import ViewEditForm from '../view/edit-form.js';
import { render } from '../render.js';

export default class Presenter {

  #container = null;
  #component = null;
  #wayPointsModel = null;
  #boardPoints = null;
  #endPoints = null;
  #dlc = null;

  constructor(container) {
    this.#container = container;
    this.#component = new ViewTripList();
  }

  init(wayPointsModel) {
    this.#wayPointsModel = wayPointsModel;
    this.#boardPoints = [...this.#wayPointsModel.firstPoint];
    this.#endPoints = [...this.#wayPointsModel.endPoints];
    this.#dlc = [...this.#wayPointsModel.dlc];

    render(this.#component, this.#container);

    for (const point of this.#boardPoints){
      this.#renderTripPoint(point);
    }
  }

  #renderTripPoint = (waypoint) => {
    const wayPoint = new ViewWayPoint(waypoint, this.#endPoints, this.#dlc);
    const editForm = new ViewEditForm(waypoint, this.#endPoints, this.#dlc);

    const replaceComponents = (newComponent, oldComponent) => {
      this.#component.element.replaceChild(newComponent.element, oldComponent.element);
    };

    const closeButton = (evt) => {
      if(evt.key == 'Escape' || evt.key == 'Esc'){
        evt.preventDefault();
        replaceComponents(wayPoint, editForm);
        document.removeEventListener('keydown', closeButton);
      }
    };

    wayPoint.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceComponents(editForm, wayPoint);
      document.addEventListener('keydown', closeButton);
    });
    
    render(wayPoint, this.#component.element);
  }
}
