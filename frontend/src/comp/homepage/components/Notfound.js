import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class Notfound extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    this.props.history.goBack();
    return "";
  }
}

export default Notfound;
