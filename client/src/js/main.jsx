import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router, Route, Switch, Link, Redirect,
} from "react-router-dom";

import Greeter from "./Greeter";
import Login from "./Login";
import "antd/dist/antd.css";


function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </header>
  );
}

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

