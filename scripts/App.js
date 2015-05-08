import React from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import FluxComponent from "flummox/component";

export default class App extends React.Component {
  componentDidMount() {
    this.props.flux.getActions("tasks").categories();
    this.props.flux.getActions("tasks").list();
  }

  render() {
    return (
      <div>
        <h1>Tasks</h1>
        <FluxComponent connectToStores={["tasks"]}>
          <TaskList />
          <TaskForm />
        </FluxComponent>
      </div>
    );
  }
}
