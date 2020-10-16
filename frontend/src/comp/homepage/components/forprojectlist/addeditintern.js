import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

class Addeditintern extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectname: this.props.dat.Projectname,
      description: this.props.dat.Description,
      status: this.props.dat.Status,
      githublink: this.props.dat.Githublink,
      udata: this.props.dat.Udata,
      Udata: {},
      username: "",
      timelimit: 0,
      allusers: [],
      collectusers: [],
      redirect: false,
    };
  }
  componentDidMount() {
    this.loaddata();
    for (var yy in this.state.udata) {
      if (this.state.udata[yy].UPstatus === "Inprogress") {
        this.setState({
          Udata: this.state.udata[yy],
        });
      }
      break;
    }
  }

  loaddata = () => {
    axios
      .get("/dataforassign.php")
      .then((res) => {
        if (res.data.Username !== undefined) {
          this.setState({
            ...this.state,
            allusers: res.data.Username,
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

  delete = () => {
    var x = window.confirm("Do you want to delete?");
    if (x === true) {
      var sqls=[];
     if(this.state.status==='Assigned')
     {
      const sql1 =
      "UPDATE projectuser SET UPstatus='Project deleted by admin' WHERE Projectname='" +this.state.projectname +"' AND UPstatus='Inprogress';";
       sqls.push(sql1);
    }
    const sql2="UPDATE projectdetail SET Status='Deleted' WHERE Projectname='"+this.state.projectname+"';";
    sqls.push(sql2);
      axios
        .post("/store.php", {sqls:sqls})
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
  };

  handleSubmit = () => {
    const date = new Date(
      new Date(this.state.Udata.Enddate).getTime() +
        86400000 * 30 * this.state.timelimit
    ).toISOString();
    var sqls = [];
    if (this.state.timelimit !== 0) {
      const sql =
        "UPDATE projectuser SET Enddate='" +
        date +
        "' WHERE Projectname='" +
        this.state.projectname +
        "' AND UPstatus='Inprogress';";
      sqls.push(sql);
    }
    for (var uuser in this.state.collectusers) {
      const sql = `INSERT INTO projectuser VALUES ('${this.state.projectname}', '${this.state.collectusers[uuser]}','${this.state.Udata.Assigneddate}', '${date}', 'Inprogress')`;
      sqls.push(sql);
    }
    console.log(sqls);
    if (sqls.length !== 0) {
      axios
        .post("/store.php", { sqls: sqls })
        .then((res) => {
          alert("Done Successfully", res.data);
          this.setState({
            ...this.state,
            redirect: true,
          });
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
        alert("Insert at least one field");
        uname.focus();
      }
    } else {
      alert("Project must first assigned to someone to add users and deadline");
    }
  }

  render() {
    //console.log(this.state.allusers);
    const re = this.state.redirect;
    if (re === true) {
      this.setState({
        ...this.state,
        username: "",
        timelimit: 0,
        collectusers: [],
        redirect: false,
      });
      this.loaddata();
      return <Redirect to="/ihomepage/projectlist" />;
    }

    const xx = this.state.allusers.map((x, i) => {
      var currentusers = [];
      if (this.state.Udata.Username !== undefined) {
        currentusers = this.state.Udata.Username;
      }
      return (
        !currentusers.includes(x) && (
          <option key={i} value={x}>
            {x}
          </option>
        )
      );
    });
    const zz = this.state.collectusers.map((z, i) => {
      return (
        <li key={i} value={z}>
          {z}
        </li>
      );
    });
    return (
      <div>
        <h1>
          <button
            value="DeleteProject"
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
            <input
              type="submit"
              value="DeleteProject"
              className="btn btn-danger"
              onClick={this.delete}
              style={{ float: "right" }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Addeditintern;
