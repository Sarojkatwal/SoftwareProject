import React from "react";
import Login from "./comp/login.js";
import Ihomepage from "./comp/homepage/ihomepage.js";
import { Route, Switch } from "react-router-dom";
import NotFound from "./comp/homepage//components/Notfound.js";
import { ProtectedRoute } from "./protected.route";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute
            path="/ihomepage"
            obj={{ key: "loggedin", value: "true" }}
            component={Ihomepage}
          />
          <Route component={NotFound} />>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
