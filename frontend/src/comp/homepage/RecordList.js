import React, { Component } from "react";

class RecordList extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.obj.Id}</td>
        <td>{this.props.obj.Name}</td>
        <td>{this.props.obj.ProjectName}</td>
        <td>{this.props.obj.EndDate}</td>
        <td>{this.props.obj.Address}</td>
      </tr>
    );
  }
}

export default RecordList;
