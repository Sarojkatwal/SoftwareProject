import React, { Component } from "react";
import Projectlist from "../components/projectlist.js";

class Cproject extends Component {
  render() {
    const uname = sessionStorage.getItem("username");
    const aa =
      "SELECT * FROM  projectdetail WHERE Status IN('Completed') AND Assignedto LIKE '%" +
      uname +
      "%' ";
    return <Projectlist sqls={aa} />;
  }
}

export default Cproject;
