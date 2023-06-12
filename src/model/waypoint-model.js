export default class WayPointsModel {
  constructor() {
    this.points = [];
  }

  init(points, endPoints, offers) {
    this.allPoints = points;
    this.endPoints = endPoints;
    this.dlc = offers;
  }

  getAllPoints() {
    return this.allPoints;
  }

  getEndPonts() {
    return this.endPoints;
  }

  getDlc() {
    return this.dlc;
  }
}


