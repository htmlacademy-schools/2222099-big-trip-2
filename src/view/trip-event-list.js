import { createElement } from '../render.js';


const createTemplateEventList = () =>
  '<ul class="trip-events__list">\
  </ul>';

  
export default class ViewTripList {
  getTemplate() {
    return createTemplateEventList();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}