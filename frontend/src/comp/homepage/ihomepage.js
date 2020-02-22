import React, { Component } from "react";
import "./ihomepage.css";
import { Route, NavLink, Switch } from "react-router-dom";
import Home from "./components/Home.js";
import Chatbox from "./componentsforintern/Chatbox.js";
import Addinterns from "./components/add.js";
import Pdetail from "./componentsforintern/Pdetail.js";
import Notfound from "./components/Notfound.js";
import Submitfile from "./componentsforintern/Submitfile.js";
import Completedproject from "./components/Completedproject.js";
import Projectlist from "./components/projectlist.js";
import Otherlinks from "./components/Otherlinks.js";
import Optionscreator from "./components/optionscreator.js";
import Logo from "./pictures/logo.png";
import { FaUserCircle } from "react-icons/fa";
import Assignproject from "./components/assignproject";
import Showinterns from "./components/showinterns";
import Message from "./components/message.js";

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
                {sessionStorage.getItem("type") === "matchedasintern" ? (
                  <>
                    <Optionscreator
                      classname="fa fa-home"
                      linkto="/ihomepage"
                      field="Home"
                    />
                    <Optionscreator
                      classname="fa fa-info-circle"
                      linkto="/ihomepage/pdetail"
                      field="Personal Info."
                    />
                    <Optionscreator
                      classname="fa fa-comment-o"
                      linkto="/ihomepage/chatbox"
                      field="Chatbox"
                    />
                    <Optionscreator
                      classname="fa fa-file-code-o"
                      linkto="/ihomepage/submitfile"
                      field="Submmit File"
                    />
                    <Optionscreator
                      classname="fa fa-folder"
                      linkto="/ihomepage/completedproject"
                      field="CompletedProject"
                    />
                    <Optionscreator
                      classname="fa fa-link"
                      linkto="/ihomepage/otherlinks"
                      field="Other Links"
                    />
                  </>
                ) : (
                  <>
                    <Optionscreator
                      classname="fa fa-user"
                      linkto="/ihomepage/internsdetail"
                      field="All Interns"
                    />
                    <Optionscreator
                      classname="fa fa-plus-circle"
                      linkto="/ihomepage/add"
                      field="Add Items"
                    />
                    <Optionscreator
                      classname="fa fa-list"
                      linkto="/ihomepage/projectlist"
                      field="Project List"
                    />
                    <Optionscreator
                      classname="fa fa-th-list"
                      linkto="/ihomepage/cmprojectlist"
                      field="Completed Project List"
                    />
                    <Optionscreator
                      classname="fa fa-list-alt"
                      linkto="/ihomepage/astointern"
                      field="Assign Project"
                    />
                    <Optionscreator
                      classname="fa fa-comments"
                      linkto="/ihomepage/message"
                      field="message"
                    />
                  </>
                )}
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
                    <Route path="/ihomepage/add" component={Addinterns} />
                    <Route
                      path="/ihomepage/internsdetail"
                      component={Showinterns}
                    />
                    <Route
                      path="/ihomepage/projectlist"
                      component={Projectlist}
                    />
                    <Route
                      path="/ihomepage/cmprojectlist"
                      component={Completedproject}
                    />
                    <Route
                      path="/ihomepage/astointern"
                      component={Assignproject}
                    />
                    <Route path="/ihomepage/message" component={Message} />
                    <Route
                      path="/ihomepage/submitfile"
                      component={Submitfile}
                    />
                    {/* <Route
                      path="/ihomepage/completedproject"
                      component={Completedproject}
                   />*/}
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
