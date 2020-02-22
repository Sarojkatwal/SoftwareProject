import React, { Component } from "react";
import Projectlist from "./projectlist.js";

class Completedproject extends Component {
  render() {
    const aa = "SELECT * FROM  projectdetail WHERE Status IN('Completed')";
    return <Projectlist sqls={aa} />;
  }
}

export default Completedproject;
