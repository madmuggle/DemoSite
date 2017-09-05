import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./Header";
import Body from "./Body";
import Greeter from "./Greeter";
import Login from "./Login";
import Registration from "./Registration";

import { reduxStore } from "./reduxStore";

import "antd/dist/antd.css";


render((
  <Provider store={reduxStore}>
    <BrowserRouter>
      <div>
        <Header />
        <Body>
          <Switch>
            <Route exact path="/" component={Greeter} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Registration} />
            <Redirect path="*" to="/" />
          </Switch>
        </Body>
      </div>
    </BrowserRouter>
  </Provider>
), document.getElementById("root"));

