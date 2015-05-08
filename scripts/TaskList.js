import React from 'react';
import Task from './Task';

export default class TaskList extends React.Component {
  render() {
    return (
      <ul>{
        this.props.tasks.map((task, key) => {
          return <Task key={key} name={task.name}/>;
        })
      }</ul>
    );
  }
}
