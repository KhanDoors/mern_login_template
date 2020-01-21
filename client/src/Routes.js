import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import App from "./App";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      </Switch>
    </Router>
  );
};

export default Routes;
