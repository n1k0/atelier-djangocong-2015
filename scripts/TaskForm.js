import React from 'react';

export default class TaskForm extends React.Component {
  onFormSubmit(event) {
    event.preventDefault();
    this.props.flux.getActions("tasks").create({
      owner: "niko",
      name: event.target.name.value,
      categories: [event.target.category.value]
    });
  }

  render() {
    return (
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
              this.props.categories.map((cat, key) => {
                return <option key={key} value={cat.name}>{cat.name}</option>;
              })
            }</select>
          </label>
        </div>
        <button className="btn btn-primary" type="submit">Create</button>
      </form>
    );
  }
}
