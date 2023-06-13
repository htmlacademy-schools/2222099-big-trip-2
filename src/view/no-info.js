import AbstractView from '../framework/view/abstract-view';

const createNoAdditionalInfo = () => (
  `<p class="trip-events__msg">
  Sorry, there was an error loading the data
  </p>`);

export default class EmptyAdditionalInfo extends AbstractView {

  get template() {
    return createNoAdditionalInfo();
  }
}
