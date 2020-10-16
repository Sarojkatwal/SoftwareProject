import React, { Component } from "react";
import Showprojects from "./showprojects.js";
import Showpersonalinfo from "./showpersonalinfo.js";

class Showdetail extends Component {
  render() {
    return (
      <>
        <Showpersonalinfo dat={this.props.dat} />
        <Showprojects proj={this.props.proj} />
        <input
          type="submit"
          className="btn btn-primary"
          value="Goback"
          onClick={this.props.action}
        />
      </>
    );
  }
}
export default Showdetail;
