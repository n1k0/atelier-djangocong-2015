import React from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const TaskClient = {
  get defaultHeaders() {
    return {
      "Accept": "application/json",
      "Content-Type": "application/json",
    };
  },

  _wrap(promise) {
    return promise.then(res => res.json()).catch(err => {
      alert('failed ' + err);
    });
  },

  categories() {
    return this._wrap(fetch("http://127.0.0.1:8000/category/", {
      headers: this.defaultHeaders
    }));
  },

  list() {
    return this._wrap(fetch("http://127.0.0.1:8000/task/", {
      headers: this.defaultHeaders
    }));
  },

  create(task) {
    return this._wrap(fetch("http://127.0.0.1:8000/task/", {
      method: "POST",
      headers: this.defaultHeaders,
      body: JSON.stringify(task)
    }));
  }
}

export default class App extends React.Component {
  state = {categories: [], tasks: []};

  componentDidMount() {
    Promise.all([
      TaskClient.categories(),
      TaskClient.list(),
    ]).then(results => {
      this.setState({
        categories: results[0],
        tasks: results[1],
      });
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    TaskClient.create({
      owner: "niko",
      name: event.target.name.value,
      categories: [event.target.category.value]
    }).then(task => {
      this.setState({
        tasks: this.state.tasks.concat(task)
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Tasks</h1>
        <TaskList tasks={this.state.tasks} />
        {/* Note: we shouldn't have to bind here, bug? */}
        <TaskForm categories={this.state.categories}
                  onSubmit={this.onFormSubmit.bind(this)} />
      </div>
    );
  }
}
