import { dateTime } from '../utils/event-date.js';
import { TYPES_POINT } from '../mock/waypoint.js';
import { firstLetterUp } from '../utils/consts.js';
import AbstracStatefultView from '../framework/view/abstract-stateful-view.js';

const endPictureRender = (pictures) => {
  let result = '';
  pictures.forEach((picture) => {
    result = `${result}<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
  });

  return result;
};

const offersRender = (allOffers, offerCheck) => {

  let result ='';
  allOffers.forEach((offer) => {

    const checkOff = offerCheck.includes(offer.id) ? 'check' : '';

    result = `${result}
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-luggage" ${checkOff}>
      <label class="event__offer-label" for="event-offer-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  });

  return result;
};

const renderEditPointDateTemplate = (dateFrom, dateTo) => (
  `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateTime(dateFrom)}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTime(dateTo)}">
  </div>`
);

const editPointTemplateRender = (currentType) => TYPES_POINT.map((type) =>
  `<div class="event__type-item">
     <input id="event-type-${type}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''}>
     <label class="event__type-label  event__type-label--${type}" for="event-type-${type}">${firstLetterUp(type)}</label>
   </div>`).join('');

const renderEndPointsName = (endPoint) => {
  let result = '';
  endPoint.forEach((endPoint) => {
    result = `${result}
    <option value="${endPoint.name}"></option>`;
  });
  
  return result;
};


const createTemplateEditForm = (point, endPoint, offers) => {

  const {basePrice, type, destinationId, dateFrom, dateTo, offerIds} = point;
  const allPointOffersType = offers.find((offer) => offer.type === type);

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${editPointTemplateRender(type)}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-${destinationId}">
          ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-${destinationId}" type="text" name="event-destination" value="${endPoint[destinationId].name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${renderEndPointsName(endPoint)}
          </datalist>
        </div>
        ${editPointTemplateRender(dateFrom, dateTo)}
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div>
          ${offersRender(allPointOffersType.offers, offerIds)}
          </div>
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${endPoint[destinationId].description}</p>
            <div class="event__photos-container">
                        <div class="event__photos-tape">
                        ${endPictureRender(endPoint[destinationId].pictures)}
                      </div>
                    </div>
        </section>
    </form>
  </li>`
  );
};


export default class ViewEditForm extends AbstracStatefultView {
  
  #firstPoint = null;
  #endPoint = null;
  #offers = null;


  constructor(firstPoint, endPoint, offers) {
    super();
    this.#firstPoint = firstPoint;
    this.#endPoint = endPoint;
    this.#offers = offers;
  }

  get template() {
    return createTemplateEditForm(this.#firstPoint, this.#endPoint, this.#offers);
  }

  setPointClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#pointClickHandler);
  };

  setSubmitHandler = (callback) => {
    this._callback.submit = callback;
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#submitHandler);
  };

  #pointClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #submitHandler = (evt) =>{
    evt.preventDefault();
    this._callback.submit(this.#firstPoint);
  };
}