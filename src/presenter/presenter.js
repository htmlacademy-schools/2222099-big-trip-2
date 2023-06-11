import { render } from '../render.js';
import ViewTripList from '../view/trip-event-list.js';;
import ViewEditForm from '../view/edit-form.js';
import ViewWayPoint from '../view/event-item.js';


export default class Presenter {
    constructor({container}) {
        this.element = new ViewTripList();
        this.container = container;
    }

    init() {
        render(this.element, this.container);
        render(new ViewEditForm(), this.element.getElement());
        render(new ViewWayPoint, this.element.getElement());
        for (let i = 1; i < 3; i++) {
            render (new ViewWayPoint(), this.element.getElement());
        }
    }
}