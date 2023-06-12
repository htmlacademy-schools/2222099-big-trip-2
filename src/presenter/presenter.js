import ViewTripList from '../view/trip-event-list.js';
import ViewWayPoint from '../view/event-item.js';
import ViewEditForm from '../view/edit-form.js';
import Empty from '../view/empty.js';
import { render, replace } from '../framework/render.js';

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

    if (this.#boardPoints === 0) {
      render(new Empty(), this.#container);
    }
    else {
      render(this.#component, this.#container);

      for (const point of this.#boardPoints) {
        this.#renderTripPoint(point);
      }
    }
  }

  #renderTripPoint = (waypoint) => {
    const wayPoint = new ViewWayPoint(waypoint, this.#endPoints, this.#dlc);
    const editForm = new ViewEditForm(waypoint, this.#endPoints, this.#dlc);

    const chagingComponents = (newComponent, oldComponent) => {
      replace(newComponent, oldComponent);
    };

    const closeEventFormButton = (evt) => {
      if (evt.key === "Delete" || evt.key === "Delete") {
        evt.preventDefault();
        chagingComponents(wayPoint, editForm);
        document.removeEventListener('keydown', closeEventFormButton);
      }

      if (evt.key == 'Escape' || evt.key == 'Esc'){
        evt.preventDefault();
        chagingComponents(wayPoint, editForm);
        document.removeEventListener('keydown', closeEventFormButton);
      }

      if (evt.key === "Backspace" || evt.key === "Delete") {
        evt.preventDefault();
        chagingComponents(wayPoint, editForm);
        document.removeEventListener('keydown', closeEventFormButton);
      }
    };

    wayPoint.setEditClickHandler(() => {
      chagingComponents(editForm, wayPoint);
      document.addEventListener('keydown', closeEventFormButton);
    });

    editForm.setPointClickHandler(() => {
      chagingComponents(pointComponent, editingFormComponent);
      document.RemoveEventListener('keydown', closeEventFormButton);
    });

    editForm.setSubmitHandler(() => {
      chagingComponents(pointComponent, editingFormComponent);
      document.removeEventListener('keydown', closeEventFormButton);
    });
    
    render(wayPoint, this.#component.element);
  }
}