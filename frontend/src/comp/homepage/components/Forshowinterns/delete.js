import React, { Component } from "react";
import axios from "axios";

class Delete extends Component {
  constructor(props) {
    super(props);
  }
  delete = () => {
    const sql1 =
      "DELETE FROM internuser WHERE Username LIKE '" +
      this.props.dat.Username +
      "'";
    const sql2 =
      "UPDATE internsdetail SET Status = 'Notactive' WHERE Username = '" +
      this.props.dat.Username +
      "'";

    var x = window.confirm("Do you want to delete it (final warning):");
    if (x === true) {
      const obj = {
        o1: sql1,
        o2: sql2
        //o3: sql3
      };
      axios
        .post("/deleteuser.php", obj)
        .then(res => {
          if (res.data !== undefined) {
            alert(res.data);
          }
          this.props.action();
        })
        .catch(err => {
          alert(err);
        });
    }
  };
  render() {
    return (
      <div
        style={{
          textAlign: "center",
          margin: "auto"
        }}
      >
        <button className="btn btn-danger" onClick={this.delete}>
          Click Here to <br />
          remove user <br />
          from database
        </button>
      </div>
    );
  }
}

export default Delete;
