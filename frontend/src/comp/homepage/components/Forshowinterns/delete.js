import React, { Component } from "react";
import axios from "axios";

class Delete extends Component {
  componentDidMount = () => {
    this.delete();
  };
  delete = () => {
    const sql1 =
      "Update  projectuser SET UPstatus='LeftBeforeCompletion' WHERE uid='" +
      this.props.dat.Uid +
      "' AND UPstatus='Active'";
    const sql2 =
      "UPDATE internuser SET Status = 'Inactive' WHERE Username = '" +
      this.props.dat.Username +
      "'";

    var x = window.confirm("Do you want to delete it (final warning):");
    if (x === true) {
      const obj = {
        o1: sql1,
        o2: sql2,
        //o3: sql3
      };
      axios
        .post("/deleteuser.php", obj)
        .then((res) => {
          if (res.data !== undefined) {
            alert(res.data);
          }
          this.props.action();
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      this.props.action();
    }
  };
  render() {
    return <></>;
  }
}

export default Delete;
