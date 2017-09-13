import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { message } from "antd";
import reqSvc from "./reqSvc";
import { normalizeNameSpell } from "./utils";


class Body extends Component {

  async updateUserInfo() {
    try {
      const r = await reqSvc({ action: "GetUserInfo" });
      if (r.status !== "success") {
        console.warn("Unexpected response:", r);
        return;
      }

      r.data.name = normalizeNameSpell(r.data.name);

      this.props.updateUserInfo(r.data);
      this.props.logInfoAcknowledge(true);
    } catch (e) {
      console.warn("reqSvc failed:", e.message);
      this.props.logInfoAcknowledge(false);
    }
  }

  componentDidMount() {
    this.updateUserInfo();
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserInfo: (userInfo) => (
      dispatch({ type: "UPDATE_USERINFO", data: userInfo })
    ),
    logInfoAcknowledge: isLoggedIn => (
      dispatch({ type: isLoggedIn ? "LOGIN" : "LOGOUT" })
    ),
  }
}


export default withRouter(
  connect(null, mapDispatchToProps)(Body)
);

