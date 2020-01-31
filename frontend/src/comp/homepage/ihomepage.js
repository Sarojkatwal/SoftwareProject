import React, { Component } from "react";
import "./ihomepage.css";
import Logo from "./logo.png";
import { FaUserCircle } from "react-icons/fa";
import { Route, NavLink, Switch } from "react-router-dom";
import Home from "./Home.js";
import Chatbox from "./Chatbox.js";
import Pdetail from "./Pdetail.js";
import Notfound from "./Notfound.js";
import Submitfile from "./Submitfile.js";
import Completedproject from "./Completedproject.js";
import Otherlinks from "./Otherlinks.js";

class Ihomepage extends Component {
  constructor() {
    super();
    this.state = { loader: false };
  }
  logOut = () => {
    var x = window.confirm("Do you want to log out?");
    if (x === true) {
      sessionStorage.setItem("username", "");
      sessionStorage.setItem("loggedin", "false");
      this.setState({
        loader: true
      });
      setTimeout(() => {
        this.setState({
          loader: false
        });
        this.props.history.push("/");
      }, 5000);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div
          className={`${!this.state.loader ? "container-fluid" : "SSS"}`}
          id="set"
        >
          <div
            className="row"
            style={{ backgroundColor: "purple", opacity: "1.0" }}
          >
            <div className="col-md p-1 pl-3">
              <a className="navbar-brand" href="#">
                <img src={Logo} alt="logo" style={{ width: "50px" }} />
              </a>
              <h1 className="font-weight-bolder text-info d-inline-block align-middle ">
                LICT Intern Management
              </h1>
              <button
                id="logoutbutton"
                className="btn btn-light float-right"
                title="Logout"
                data-toggle="popover"
                data-trigger="hover"
                onClick={this.logOut}
              >
                <FaUserCircle
                  style={{
                    width: "60px",
                    height: "60px"
                  }}
                />
              </button>
            </div>
          </div>

          <div className="row">
            <button
              className="btn btn-outline-success"
              data-toggle="collapse"
              data-target="#demo"
            >
              <i className="fa fa-align-justify"></i>
            </button>

            <div className="col-sm-3 collapse show" id="demo">
              <ul className="list-group">
                <li className="list-group-item">
                  <h1>
                    <i className="fa fa-home" aria-hidden="true"></i>
                  </h1>
                  <NavLink
                    to="/ihomepage/"
                    exact
                    activeStyle={{ color: "red" }}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="list-group-item">
                  <h1>
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                  </h1>
                  <NavLink
                    to="/ihomepage/pdetail"
                    exact
                    activeStyle={{ color: "red" }}
                  >
                    Project Details
                  </NavLink>
                </li>

                <li className="list-group-item">
                  <h1>
                    <i className="fa fa-comment-o" aria-hidden="true"></i>
                  </h1>
                  <NavLink
                    to="/ihomepage/chatbox"
                    exact
                    activeStyle={{ color: "red" }}
                  >
                    Chatbox
                  </NavLink>
                </li>

                <li className="list-group-item">
                  <h1>
                    <i className="fa fa-file-code-o" aria-hidden="true"></i>
                  </h1>
                  <NavLink
                    to="/ihomepage/submitfile"
                    exact
                    activeStyle={{ color: "red" }}
                  >
                    SubmitFile
                  </NavLink>
                </li>
                <li className="list-group-item">
                  <h1>
                    <i className="fa fa-folder" aria-hidden="true"></i>
                  </h1>
                  <NavLink
                    to="/ihomepage/completedproject"
                    exact
                    activeStyle={{ color: "red" }}
                  >
                    Completed Project
                  </NavLink>
                </li>
                <li className="list-group-item">
                  <h1>
                    <i className="fa fa-link" aria-hidden="true"></i>
                  </h1>
                  <NavLink
                    to="/ihomepage/otherlinks"
                    exact
                    activeStyle={{ color: "red" }}
                  >
                    Other Links
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-sm-9" style={{ overflowY: "auto" }}>
              <div
                className="row"
                style={{
                  minHeight: "100%",
                  border: "1px solid gray",
                  paddingLeft: "0px"
                }}
              >
                <div
                  className="col-sm"
                  style={{
                    margin: "15px"
                  }}
                >
                  <Switch>
                    <Route exact path="/ihomepage/" component={Home} />
                    <Route path="/ihomepage/pdetail" component={Pdetail} />
                    <Route path="/ihomepage/chatbox" component={Chatbox} />
                    <Route
                      path="/ihomepage/submitfile"
                      component={Submitfile}
                    />
                    <Route
                      path="/ihomepage/completedproject"
                      component={Completedproject}
                    />
                    <Route
                      path="/ihomepage/otherlinks"
                      component={Otherlinks}
                    />
                    <Route component={Notfound} />
                  </Switch>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <p>Footer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className={`${
            this.state.loader ? "showlogout container-fluid" : "hidelogout"
          }`}
        >
          <h1 className="fa fa-spinner fa-spin"> </h1>
          Logging Out
        </button>
      </React.Fragment>
    );
  }
}

export default Ihomepage;
