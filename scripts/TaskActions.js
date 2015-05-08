import { Actions } from 'flummox';

var url = "http://localhost:8000";

export default class TaskActions extends Actions {
  get defaultHeaders() {
    return {
      "Accept": "application/json",
      "Content-Type": "application/json",
    };
  }

  _wrap(promise) {
    return promise.then(res => {
      if (res.status !== 204)
        return res.json();
      return null;
    }).catch(err => {
      alert('failed ' + err);
      throw err;
    });
  }

  categories() {
    return this._wrap(fetch(`${url}/category/`, {
      headers: this.defaultHeaders
    }));
  }

  list() {
    return this._wrap(fetch(`${url}/task/`, {
      headers: this.defaultHeaders
    }));
  }

  create(task) {
    return this._wrap(fetch(`${url}/task/`, {
      method: "POST",
      headers: this.defaultHeaders,
      body: JSON.stringify(task)
    }));
  }

  delete(id) {
    return this._wrap(fetch(`${url}/task/${id}/`, {
      method: "DELETE",
      headers: this.defaultHeaders
    })).then(() => id);
  }

  done(task) {
    return this._wrap(fetch(`${url}/task/${task.id}/`, {
      method: "PUT",
      headers: this.defaultHeaders,
      body: JSON.stringify(Object.assign({}, task, {done: !task.done}))
    }));
  }
}
