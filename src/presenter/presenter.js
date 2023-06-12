import ViewTripList from '../view/trip-event-list.js';
import ViewEditForm from '../view/edit-form.js';
import ViewWayPoint from '../view/event-item.js';
import { render } from '../render.js';

export default class Presenter {
  constructor(container) {
    this.container = container;
    this.component = new ViewTripList();
  }

  init(wayPointsModel) {
    this.wayPointsModel = wayPointsModel;
    this.boardPoints = [...this.wayPointsModel.getAllPoints()];
    this.endPoints = [...this.wayPointsModel.getEndPonts()];
    this.dlc = [...this.wayPointsModel.getDlc()];
    
    render(this.component, this.container);
    render(new ViewEditForm(this.boardPoints[0], this.endPoints, this.dlc), this.component.getElement());

    for (const point of this.boardPoints){
      render(new ViewWayPoint(point, this.endPoints, this.dlc), this.component.getElement());
    }
  }
}