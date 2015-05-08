import { Flux } from "flummox";
import TaskActions from "./TaskActions";
import TaskStore from "./TaskStore";

export default class AppFlux extends Flux {
  constructor() {
    super();

    this.createActions("tasks", TaskActions);
    this.createStore("tasks", TaskStore, this);
  }
}
