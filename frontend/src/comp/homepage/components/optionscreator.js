import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class Optionscreator extends Component {
  render() {
    return (
      <li className={`${this.props.classname ? "list-group-item" : ""}`}>
        {this.props.classname && (
          <h1>
            <i className={this.props.classname} aria-hidden="true"></i>
          </h1>
        )}
        <NavLink to={this.props.linkto} exact activeStyle={{ color: "red" }}>
          {this.props.field}
        </NavLink>
      </li>
    );
  }
}

export default Optionscreator;
