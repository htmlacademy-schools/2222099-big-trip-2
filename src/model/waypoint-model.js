export default class WayPointsModel {

  #firstPoint = null;
  #endPoints = null;
  #dlc = null;

  constructor() {
    this.#firstPoint = [];
  }

  init(firstPoint, endPoints, dlc) {
    this.#firstPoint = firstPoint;
    this.#endPoints = endPoints;
    this.#dlc = dlc;
  }

  get firstPoint() {
    return this.#firstPoint;
  }

  get endPoints() {
    return this.#endPoints;
  }

  get dlc() {
    return this.#dlc;
  }
}


