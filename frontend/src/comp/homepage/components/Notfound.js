import { Component } from "react";

class Notfound extends Component {
  render() {
    this.props.history.goBack();
    return "";
  }
}

export default Notfound;
