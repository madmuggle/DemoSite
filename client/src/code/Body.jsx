import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withReqSvc from "./withReqSvc";

class Body extends Component {

  componentDidMount() {
    this.props.updateUserInfo();
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}


export default withRouter(withReqSvc(Body));

