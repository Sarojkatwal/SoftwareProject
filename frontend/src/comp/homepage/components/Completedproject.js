import React, { Component } from "react";
import Projectlist from "./projectlist.js";

class Completedproject extends Component {
  render() { 
    const aa="SELECT p.Pid,Pstatus,Githublink,Description,Projectname,Assigneddate,Enddate,Uid,Username,"
        +"UPstatus FROM projectdetail p LEFT JOIN (SELECT * FROM projectuser " +
        "NATURAL JOIN internuser ) s ON p.Pid=s.Pid WHERE Pstatus IN ('Completed')";
    return <Projectlist sqls={aa} />;
  }
}

export default Completedproject;
