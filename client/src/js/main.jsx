import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router, Route, Switch, Link, Redirect,
} from "react-router-dom";

import Greeter from "./Greeter";
import Login from "./Login";
import Header from "./Header";

import "antd/dist/antd.css";


render((
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Greeter} />
        <Route path="/login" component={Login} />
        <Redirect path="*" to="/" />
      </Switch>
    </div>
  </Router>
), document.getElementById("root"));

