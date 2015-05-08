import { Store } from 'flummox';

export default class TaskStore extends Store {
  constructor(flux) {
    super();

    const taskActionIds = flux.getActionIds('tasks');
    this.register(taskActionIds.categories, this.handleGetCategories);
    this.register(taskActionIds.create, this.handleCreateTask);
    this.register(taskActionIds.delete, this.handleDeleteTask);
    this.register(taskActionIds.list, this.handleListTasks);
    this.register(taskActionIds.done, this.handleDoneTask);

    this.state = {
      categories: [],
      tasks: [],
    };
  }

  handleGetCategories(categories) {
    this.setState({categories: categories});
  }

  handleCreateTask(task) {
    this.setState({tasks: this.state.tasks.concat(task)});
  }

  handleDeleteTask(id) {
    this.setState({tasks: this.state.tasks.filter(task => task.id !== id)});
  }

  handleListTasks(tasks) {
    this.setState({tasks: tasks});
  }

  handleDoneTask(task) {
    this.setState({tasks: this.state.tasks.map(oTask => {
      if (oTask.id === task.id)
        oTask.done = task.done;
      return oTask;
    })});
  }
}
