import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Optionscreator from "./optionscreator.js";
import Addadmin from "./Foradditem/addadmin.js";
import Addintern from "./Foradditem/addintern.js";
import Addproject from "./Foradditem/addproject.js";

class Add extends Component {
  render() {
    return (
      <div>
        <ul className="navbar">
          <Optionscreator
            classname=""
            linkto="/ihomepage/add/"
            field="Intern"
          />
          <Optionscreator
            classname=""
            linkto="/ihomepage/add/admin"
            field="Admin"
          />
          <Optionscreator
            classname=""
            linkto="/ihomepage/add/project"
            field="Project"
          />
        </ul>
        <Switch>
          <Route exact path="/ihomepage/add/" component={Addintern} />
          <Route exact path="/ihomepage/add/admin" component={Addadmin} />
          <Route exact path="/ihomepage/add/project" component={Addproject} />
        </Switch>
      </div>
    );
  }
}
export default Add;
