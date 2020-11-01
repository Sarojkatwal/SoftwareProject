import React, { Component } from "react";
import Projectlist from "../components/projectlist.js";

class Cproject extends Component {
  render() {
    const uname = sessionStorage.getItem("username");
    const aa =
      "SELECT * FROM  projectdetail NATURAL JOIN projectuser NATURAL JOIN internuser WHERE Pid IN ( " +
      "SELECT Pid FROM projectuser NATURAL JOIN internuser WHERE Username='" +
      uname +
      "')";
    console.log("Uname=", uname);
    return <Projectlist sqls={aa} />;
  }
}

export default Cproject;
