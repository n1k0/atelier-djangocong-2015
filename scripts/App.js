import React from 'react';
import FluxComponent from 'flummox/component';

class TaskList extends React.Component {
  onCheckboxClick(task) {
    this.props.flux.getActions("tasks").toggle(task);
  }

  render() {
    return (
      <ul>{
        this.props.tasks.map(task => {
          return <li>
            <input type="checkbox" defaultChecked={task.done}
                   onClick={this.onCheckboxClick.bind(this, task)} />
            {task.name}
          </li>;
        })
      }</ul>
    );
  }
}

class TaskForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.onFormSubmit}>
        <input type="text" name="name"/>
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default class App extends React.Component {
  componentDidMount() {
    this.props.flux.getActions("tasks").list();
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.flux.getActions("tasks").create({
      owner: "niko",
      categories: [],
      name: event.target.name.value
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FluxComponent flux={this.props.flux} connectToStores={["tasks"]}>
          <TaskList tasks={this.props.tasks} />
          <TaskForm onFormSubmit={this.onFormSubmit.bind(this)} />
        </FluxComponent>
      </div>
    );
  }
}
