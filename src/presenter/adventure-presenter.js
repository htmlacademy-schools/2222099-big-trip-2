import { render, remove, RenderPosition } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import ViewSort from '../view/sorting.js';
import ViewAdventureList from '../view/adventure-list.js';
import ViewEmpty from '../view/empty-point.js';
import ViewLoad from '../view/loading.js';
import EmptyAdditionalInfo from '../view/no-info.js';
import PointPresenter from './waypoint-presenter.js';
import PointNewPresenter from './waypoint-new-presenter.js';
import TripInfoPresenter from './adventure-info-presenter.js';
import { sorting } from '../utils/sort.js';
import { filter } from '../utils/filters.js';
import { UpdateType, UserAction, SortType, FilterType, TimeLimit } from '../utils/consts.js';

export default class AdventurePresenter {

  #tripContainer = null;
  #tripInfoContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #noPointComponent = null;
  #sortComponent = null;
  #pointListComponent = new ViewAdventureList();
  #loadingComponent = new ViewLoad();
  #noAdditionalInfoComponent = new EmptyAdditionalInfo();

  #pointPresenters = new Map();
  #tripInfoPresenter = null;
  #currentSortType = SortType.DAY;
  #pointNewPresenter = null;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor({tripInfoContainer, tripContainer, pointsModel, filterModel, destinationsModel, offersModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#pointNewPresenter = new PointNewPresenter({
      pointListContainer: this.#pointListComponent.element,
      changeData: this.#handleViewAction,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel
    });

    this.#destinationsModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    sorting[this.#currentSortType](filteredPoints);
    return filteredPoints;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if (this.#offersModel.offers.length === 0 || this.#destinationsModel.destinations.length === 0) {
      this.#renderNoAdditionalInfo();
      return;
    }
    const pointCount = this.points.length;
    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderPointList(this.points);
    this.#renderSort();
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    if (this.#noPointComponent) {
      render(this.#pointListComponent, this.#tripContainer);
    }
    this.#pointNewPresenter.init(callback);
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#clearTripInfo();
        this.#renderTripInfo();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        this.#renderTripInfo();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new ViewSort(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderNoPoints = () => {
    this.#noPointComponent = new ViewEmpty(this.#filterType);
    render(this.#noPointComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

   #renderNoAdditionalInfo = () => {
    render(this.#noAdditionalInfoComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPointList = (points) => {
    render(this.#pointListComponent, this.#tripContainer);
    this.#renderPoints(points);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderTripInfo = () => {
    this.#tripInfoPresenter = new TripInfoPresenter(this.#tripInfoContainer, this.#destinationsModel, this.#offersModel);
    const sortedPoints = sorting[SortType.DAY](this.points);
    this.#tripInfoPresenter.init(sortedPoints);
  };


  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      changeData: this.#handleViewAction,
      changeMode: this.#handleModeChange,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #clearTripInfo = () => {
    this.#tripInfoPresenter.destroy();
  };
}
