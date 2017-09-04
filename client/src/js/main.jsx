import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createStore } from "redux";

import Greeter from "./Greeter";
import Login from "./Login";
import Registration from "./Registration";
import Header from "./Header";

import "antd/dist/antd.css";


render((
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Greeter} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Redirect path="*" to="/" />
      </Switch>
    </div>
  </BrowserRouter>
), document.getElementById("root"));

