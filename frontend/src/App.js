import React from "react";
import "./App.css";
import Login from "./comp/login.js";
import Ihomepage from "./comp/homepage/ihomepage.js";
import { Route, Switch } from "react-router-dom";
import NotFound from "./comp/homepage/Notfound.js";
import { ProtectedRoute } from "./protected.route";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <ProtectedRoute path="/ihomepage" component={Ihomepage} />
        <Route component={NotFound} />>
      </Switch>
    </div>
  );
}

export default App;
