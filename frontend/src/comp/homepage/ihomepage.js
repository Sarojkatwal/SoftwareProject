import React, { Component } from "react";
import "./ihomepage.css";
import Logo from "./logo.png";
import { FaUserCircle } from "react-icons/fa";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import Home from "./Home.js";
import Chatbox from "./Chatbox.js";
import Pdetail from "./Pdetail.js";
import Notfound from "./Notfound.js";
import Submitfile from "./Submitfile.js";
import Completedproject from "./Completedproject.js";
import Otherlinks from "./Otherlinks.js";
import auth from "../../auth";

class Ihomepage extends Component {
  constructor(props) {
    super(props);
  }
  logOut = () => {
    auth.logout(() => {
      this.props.history.push("/");
    });
  };
  render() {
    return (
      <div className="grid-container">
        <div className="header">
          <img src={Logo} alt={Logo} />
          <button className="lout" onClick={this.logOut}>
            <FaUserCircle
              style={{
                width: "60px",
                height: "60px",
                position: "relative",
                float: "right"
              }}
            />
          </button>
          <h2> LICT Intern Management</h2>
        </div>
        <div className="left">
          <ul className="Sidebar">
            <li>
              <NavLink to="/ihomepage/" exact activeStyle={{ color: "red" }}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ihomepage/pdetail"
                exact
                activeStyle={{ color: "red" }}
              >
                ProjectDetail
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ihomepage/chatbox"
                exact
                activeStyle={{ color: "red" }}
              >
                Chatbox
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ihomepage/submitfile"
                exact
                activeStyle={{ color: "red" }}
              >
                SubmitFile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ihomepage/completedproject"
                exact
                activeStyle={{ color: "red" }}
              >
                Completed Project
              </NavLink>
            </li>
            <li>
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
        <div className="middle">
          <Switch>
            <Route exact path="/ihomepage/" component={Home} />
            <Route path="/ihomepage/pdetail" component={Pdetail} />
            <Route path="/ihomepage/chatbox" component={Chatbox} />
            <Route path="/ihomepage/submitfile" component={Submitfile} />
            <Route
              path="/ihomepage/completedproject"
              component={Completedproject}
            />
            <Route path="/ihomepage/otherlinks" component={Otherlinks} />
            <Route component={Notfound} />
          </Switch>
        </div>
        <div className="footer" id="saroj">
          <p>Footer</p>
        </div>
      </div>
    );
  }
}

export default Ihomepage;
