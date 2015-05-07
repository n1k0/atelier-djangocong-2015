import React from 'react';

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

class Task extends React.Component {
  onCheckboxClick(event) {
    // TODO
  }

  render() {
    return (
      <li>
        <label>
          <input type="checkbox" onClick={this.onCheckboxClick}/>{" "}
          {this.props.name}
        </label>
      </li>
    );
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
        <ul>{
          this.state.tasks.map((task, key) => {
            return <Task key={key} name={task.name}/>;
          })
        }</ul>
        {/* Note: we shouldn't have to bind here, bug? */}
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <div className="form-group">
            <label>
              <span>Name</span>
              <input type="text" className="form-control" name="name" placeholder="Task name"/>
            </label>
          </div>
          <div className="form-group">
            <label>
              <span>Category</span>
              <select className="form-control" name="category">{
                this.state.categories.map((cat, key) => {
                  return <option key={key} value={cat.name}>{cat.name}</option>;
                })
              }</select>
            </label>
          </div>
          <button className="btn btn-primary" type="submit">Create</button>
        </form>
      </div>
    );
  }
}
