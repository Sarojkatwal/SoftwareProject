import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

class Addeditintern extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: this.props.dat.Pid,
      projectname: this.props.dat.Projectname,
      description: this.props.dat.Description,
      status: this.props.dat.Status,
      githublink: this.props.dat.Githublink,
      udata: this.props.dat.Udata,
      Udata: [],
      username: "",
      timelimit: 0,
      allusers: [],
      collectusers: [],
    };
  }
  componentDidMount() {
    this.loaddata();
    var kk = [];
    for (var yy in this.state.udata) {
      var mm = this.state.udata[yy].Uid;
      ///console.log(mm)
      kk.push(mm);
    }
    this.setState({
      ...this.state,
      Udata: kk,
    });
  }

  loaddata = () => {
    axios
      .get("/dataforassign.php")
      .then((res) => {
        //console.log(res.data);
        if (res.data.Userinfo !== undefined) {
          this.setState({
            ...this.state,
            allusers: res.data.Userinfo,
          });
        }
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
    if (name === "username") {
      this.setState({
        ...this.state,
        collectusers: [...this.state.collectusers, value],
      });
    }
  };

  /*delete = () => {
    var x = window.confirm("Do you want to delete?");
    if (x === true) {
      var sqls = [];
      if (this.state.status === "Assigned") {
        const sql1 =
          "UPDATE projectuser SET UPstatus='Project deleted by admin' WHERE Projectname='" +
          this.state.projectname +
          "' AND UPstatus='Inprogress';";
        sqls.push(sql1);
      }
      const sql2 =
        "UPDATE projectdetail SET Status='Deleted' WHERE Projectname='" +
        this.state.projectname +
        "';";
      sqls.push(sql2);
      axios
        .post("/store.php", { sqls: sqls })
        .then((res) => {
          alert("Done Successfully ", res.data);
          this.setState({
            ...this.state,
            redirect: true,
          });
        })
        .catch((err) => {
          alert(err);
        });
    }
  };*/

  handleSubmit = () => {
    var date = new Date(
      new Date().getTime() + 86400000 * 30 * this.state.timelimit
    ).toISOString();
    var sqls = [];
    if (this.state.timelimit !== 0) {
      var dtae = new Date().toISOString();
      for (var uuser in this.state.collectusers) {
        const sql = `INSERT INTO projectuser VALUES ('${this.state.pid}', '${this.state.collectusers[uuser]}','${dtae}}', '${date}', 'Inprogress')`;
        sqls.push(sql);
      }
    }
    //console.log(sqls);
    if (sqls.length !== 0) {
      axios
        .post("/store.php", { sqls: sqls })
        .then((res) => {
          alert("Done Successfully", res.data);
          this.setState({
            ...this.state,
            username: "",
            timelimit: 0,
            collectusers: [],
          });
          //this.loaddata();
          //return <Redirect to="/ihomepage/projectlist" />;
          this.props.action();
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  validate(e, func) {
    e.preventDefault();
    var uname = document.forms["RegForm"]["username"];
    if (this.state.status === "Assigned") {
      if (this.state.timelimit !== 0 || this.state.collectusers.length !== 0) {
        func();
      } else {
        alert("Insert all  the fields");
        uname.focus();
      }
    } else {
      alert("Project must first assigned to someone to add users and deadline");
    }
  }

  render() {
    const xx = this.state.allusers.map((x, i) => {
      var currentusers = [];
      if (this.state.Udata !== undefined) {
        currentusers = this.state.Udata;
      }
      //console.log("Udata=",this.state.Udata)
      //console.log("CurrentUSers,",currentusers)
      return (
        !currentusers.includes(x.Uid) && (
          <option key={i} value={x.Uid}>
            {x.Username}({x.Uid})
          </option>
        )
      );
    });

    const zz = this.state.allusers.map((x, i) => {
      return (
        this.state.collectusers.includes(x.Uid) && (
          <li key={i}>{`${x.Username}(${x.Uid})`}</li>
        )
      );
    });
    return (
      <div>
        <h1>
          <button
            value="Back"
            className="btn btn-light"
            onClick={this.props.action}
            style={{ float: "right" }}
          >
            <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
          </button>
        </h1>
        <h3>{this.state.projectname}</h3>

        <form name="RegForm">
          <div className="form-group">
            <label htmlFor="username">Add Users:</label>
            <select
              name="username"
              className="custom-select"
              required
              onChange={this.handleInputChange}
            >
              <option value="-----------" selected disabled>
                Username
              </option>
              {xx}
            </select>
            <br />
            <ol>{zz}</ol>
            <div className="form-group">
              <label htmlFor="timelimit">Time added(in Months):</label>
              <input
                type="number"
                id="atimelimit"
                name="timelimit"
                className="form-control"
                placeholder="0"
                min="0"
                required
                value={this.state.timelimit}
                onChange={this.handleInputChange}
              />
            </div>
            <input
              type="submit"
              value="Ok"
              className="btn btn-primary"
              onClick={(e) => this.validate(e, this.handleSubmit)}
            />
            <input
              type="reset"
              value="Clear"
              className="btn btn-primary float-right"
              onClick={() =>
                this.setState({
                  ...this.state,
                  redirect: true,
                })
              }
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Addeditintern;
