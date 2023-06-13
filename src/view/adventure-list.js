import AbstractView from '../framework/view/abstract-view.js';


const createTripList = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class ViewAdventureList extends AbstractView {

  get template(){
    return createTripList();
  }
}
