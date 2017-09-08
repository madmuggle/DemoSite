import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { message } from "antd";
import reqSvc from "./reqSvc";


class Body extends Component {

  async reqIsLoggedIn() {
    try {
      const r = await reqSvc({ action: "IsLoggedIn" });
      if (r.status === "success")
        this.props.logInfoAcknowledge(r.data);
      else
        console.error("Failed IsLoggedIn:", r);

    } catch (e) {
      message.warn("Request to server failed.");
    }
  }

  // Check login and trigger redux event
  componentDidMount() {
    this.reqIsLoggedIn();
  }

  render() {
    return this.props.children;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logInfoAcknowledge: isLoggedIn => (
      dispatch({ type: isLoggedIn ? "LOGIN" : "LOGOUT" })
    ),
  }
}


export default withRouter(
  connect(null, mapDispatchToProps)(Body)
);

