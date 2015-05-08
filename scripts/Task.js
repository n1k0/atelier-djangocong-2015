import React from "react";
import TaskActions from "./TaskActions";

export default class Task extends React.Component {
  onCheckboxClick() {
    this.props.flux.getActions("tasks").done(this.props.task);
  }

  onDeleteClick(event) {
    event.preventDefault();
    this.props.flux.getActions("tasks").delete(this.props.task.id);
  }

  render() {
    return (
      <li className="list-group-item">
        <label>
          <input type="checkbox" onClick={this.onCheckboxClick.bind(this)}
                 checked={this.props.task.done} />{" "}
          {this.props.task.name}
        </label>
        {" "}
        [<a href="#" onClick={this.onDeleteClick.bind(this)}>x</a>]
      </li>
    );
  }
}
