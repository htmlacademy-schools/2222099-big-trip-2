import AbstractView from '../framework/view/abstract-view.js';

const createEmptyTemplate = () => {
    '<p class="trip-events__msg">Click New Event to create your first point</p>'
}

export default class Empty extends AbstractView {

  get template() {
    return createEmptyTemplate();
  }