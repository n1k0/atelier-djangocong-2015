import React from 'react';

export default class Task extends React.Component {
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
