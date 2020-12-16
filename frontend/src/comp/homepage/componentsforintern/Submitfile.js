import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

class Submitfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: sessionStorage.getItem("uid"),
      projects: [],
      pid: "",
      linka: "",
      redirect: false,
    };
  }
  componentDidMount() {
    this.loaddata();
  }
  loaddata = () => {
    const sqls1 =
      "SELECT Pid,Pstatus,Githublink,Description,Projectname,Assigneddate,Enddate,Uid,Username," +
      "UPstatus FROM projectdetail p NATURAL JOIN (SELECT * FROM projectuser " +
      "NATURAL JOIN internuser ) s WHERE Pstatus NOT IN('Completed') AND Uid=" +
      this.state.uid;
    axios
      .post("/fetchallprojects.php", sqls1)
      .then((res) => {
        //console.log("All PRojects:", res.data);
        if (res.data !== undefined) {
          this.setState({
            ...this.state,
            projects: res.data,
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  handleSubmit = () => {
    var sql1 =
      "UPDATE projectdetail SET Pstatus='Completed' WHERE Pid=" +
      this.state.pid;
    var sql2 =
      "UPDATE projectdetail SET Githublink='" +
      this.state.linka +
      "' WHERE Pid=" +
      this.state.pid;
    var sql3 =
      "UPDATE projectuser SET UPstatus='Completed' WHERE Pid=" +
      this.state.pid +
      " AND UPstatus='Inprogress'";
    var sql = [sql1, sql2, sql3];
    //console.log(sql);
    //return;
    axios
      .post("/store.php", { sqls: sql })
      .then((res) => {
        if (res.data === "") {
          alert("Successfully done");
        } else {
          alert(res.data);
        }

        this.setState({
          ...this.state,
          redirect: true,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
  handleInputChange = (event) => {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  validate = (e) => {
    e.preventDefault();
    var pname = document.forms["RegForm"]["pid"];
    var tme = document.forms["RegForm"]["linka"];
    var x = true;
    if (this.state.pid === "") {
      pname.focus();
      x = false;
    } else if (this.state.linka === "") {
      tme.focus();
      x = false;
    } else {
      x = true;
    }
    if (x === true) {
      this.handleSubmit();
    }
  };

  render() {
    const re = this.state.redirect;
    if (re === true) {
      this.setState({
        ...this.state,
        pid: "",
        linka: "",
        projects: [],
        redirect: false,
      });
      this.loaddata();
      return <Redirect to="/ihomepage/submitfile" />;
    }
    const xx =
      this.state.projects.length !== 0 &&
      this.state.projects.map((x, i) => {
        return (
          <option key={i} value={x.Pid}>{`${x.Projectname}(${x.Pid})`}</option>
        );
      });
    return (
      <div>
        <form name="RegForm">
          <div className="form-group">
            <label htmlFor="pid">Project:</label>
            <select
              name="pid"
              className="custom-select"
              required
              onChange={this.handleInputChange}
            >
              <option value="-----------" selected disabled>
                Project Name(Pid)
              </option>
              {xx}
            </select>
          </div>
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="link">Link:</label>
              <input
                type="test"
                id="linka"
                name="linka"
                className="form-control"
                placeholder="paste link here"
                required
                value={this.state.link}
                onChange={this.handleInputChange}
              />
            </div>
            <input
              type="button"
              value="Submit"
              className="btn btn-primary"
              onClick={this.validate}
            />
          </div>
        </form>
      </div>
    );
  }
}
export default Submitfile;
