import { Actions, Store, Flummox } from 'flummox';

export class TaskActions extends Actions {
  list() {
    return fetch("http://localhost:8000/task/", {
      headers: {}
    }).then(res => res.json());
  }

  toggle(task) {
    return fetch(`http://localhost:8000/task/${task.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(Object.assign({}, task, {done: !task.done}))
    }).then(res => res.json());
  }

  create(task) {
    return fetch("http://localhost:8000/task/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(task)
    }).then(res => res.json());
  }
}

export class TaskStore extends Store {
  state = {tasks: []}

  constructor(flux) {
    super();

    const taskActionIds = flux.getActionIds('tasks');
    this.register(taskActionIds.list, this.handleListTasks);
    this.register(taskActionIds.create, this.handleCreateTask);
    this.register(taskActionIds.toggle, this.handleToggleTask);
  }

  handleListTasks(tasks) {
    this.setState({tasks: tasks});
  }

  handleCreateTask(task) {
    this.setState({tasks: this.state.tasks.concat(task)});
  }

  handleToggleTask(task) {
    this.setState({tasks: this.state.tasks.map(cTask => {
      return cTask.id === task.id ? task : cTask;
    })});
  }
}

export class AppFlux extends Flummox {
  constructor() {
    super();

    this.createActions('tasks', TaskActions);
    this.createStore('tasks', TaskStore, this);
  }
}
