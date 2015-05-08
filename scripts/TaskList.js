import React from 'react';
import Task from './Task';

export default class TaskList extends React.Component {
  render() {
    return (
      <ul className="list-group">{
        this.props.tasks.map((task, key) => {
          return <Task key={key} flux={this.props.flux} task={task} />;
        })
      }</ul>
    );
  }
}
