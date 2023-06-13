import Observable from '../framework/observable.js';
import { FilterType } from '../utils/consts.js';

export default class ModelFilter extends Observable {
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}
