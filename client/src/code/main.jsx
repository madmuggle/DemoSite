import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./Header";
import Body from "./Body";
import Greeter from "./Greeter";
import Login from "./Login";
import Registration from "./Registration";
import Settings from "./Settings";
import Notifications from "./Notifications";

import reduxStore from "./reduxStore";

import "antd/dist/antd.css";


function BasicRouter() {
  return (
    <Switch>
      <Route exact path="/" component={Greeter} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Registration} />
      <Route path="/settings" component={Settings} />
      <Route path="/notifications" component={Notifications} />
      <Redirect path="*" to="/" />
    </Switch>
  );
}

function Main() {
  return (
    <Provider store={reduxStore}>
      <BrowserRouter>
        <Body>
          <Header />
          <BasicRouter />
        </Body>
      </BrowserRouter>
    </Provider>
  );
}

render(<Main />, document.getElementById("root"));

