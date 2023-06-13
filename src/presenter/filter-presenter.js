import { render, replace, remove } from '../framework/render.js';
import ViewFilter from '../view/filters.js';
import { filter } from '../utils/filters.js';
import { FilterType, UpdateType } from '../utils/consts.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null;

  constructor({filterContainer, pointsModel, filterModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return [
      {
        type: FilterType.EVERYTHING,
        name: FilterType.EVERYTHING,
        count: filter[FilterType.EVERYTHING](points).length,
      },
      {
        type: FilterType.PAST,
        name: FilterType.PAST,
        count: filter[FilterType.PAST](points).length,
      },
      {
        type: FilterType.FUTURE,
        name: FilterType.FUTURE,
        count: filter[FilterType.FUTURE](points).length,
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new ViewFilter(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

  #handleModelEvent = () => {
    this.init();
  };
}
