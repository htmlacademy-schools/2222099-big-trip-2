import AbstractView from "../framework/view/abstract-view";

const createTripListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class ViewTripList extends AbstractView {
  
  get template() {
    return createTripListTemplate();
  }
}
