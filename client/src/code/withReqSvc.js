import React, { Component } from "react";
import hoistStatics from "hoist-non-react-statics";
import { connect } from "react-redux";
import reqSvc from "./reqSvc";
import { normalizeNameSpell } from "./utils";


export default function withReqSvc(OriginComponent) {
  class C extends Component {
    updateUserInfo = async () => {
      try {
        const r = await reqSvc({ action: "GetUserInfo" });
        if (r.status !== "success") {
          console.warn("Unexpected response:", r);
          return;
        }

        r.data.name = normalizeNameSpell(r.data.name);

        this.props.dispatchUpdateUserInfo(r.data);
        this.props.dispatchLogInfoAcknowledge(true);
      } catch (e) {
        console.warn("reqSvc failed:", e.message);
        this.props.dispatchLogInfoAcknowledge(false);
      }
    }

    reqLogin = async (userInfo) => {
      try {
        const r = await reqSvc({ action: "Login", data: userInfo });
        if (r.status === "success") {
          this.props.dispatchLogInfoAcknowledge(true);
          return "SUCCESS";
        } else {
          this.props.dispatchLogInfoAcknowledge(false);
          return r.type;
        }
      } catch (e) {
        this.props.dispatchLogInfoAcknowledge(false);
        console.warn("reqSvc failed:", e);
        return "REQUEST_FAIL";
      }
    }

    reqLogout = async () => {
      try {
        const r = await reqSvc({ action: "Logout" });
        if (r.status !== "success") {
          console.error("Failed logout:", r);
          return;
        }
        this.props.dispatchLogInfoAcknowledge(false);
      } catch (e) {
        console.warn("reqSvc failed:", e);
        throw e;
      }
    }

    async reqCreateUser(userInfo) {
      try {
        const r = await reqSvc({ action: "CreateUser", data: userInfo });
        if (r.status === "success")
          return "SUCCESS";
        else
          return r.type;
      } catch (e) {
        console.warn("reqSvc failed:", e);
        return "REQUEST_FAIL";
      }
    }

    render() {
      return (
        <OriginComponent
          {...this.props}
          updateUserInfo={this.updateUserInfo}
          reqLogin={this.reqLogin}
          reqLogout={this.reqLogout}
          reqCreateUser={this.reqCreateUser}
        />
      );
    }
  }

  const origName = OriginComponent.displayName || OriginComponent.name;
  C.displayName = `withReqSvc(${origName})`;

  return connect(null, mapDispatchToProps)(
    hoistStatics(C, OriginComponent)
  );
}


function mapDispatchToProps(dispatch) {
  return {
    dispatchUpdateUserInfo: (userInfo) => (
      dispatch({ type: "UPDATE_USERINFO", data: userInfo })
    ),
    dispatchLogInfoAcknowledge: isLoggedIn => (
      dispatch({ type: isLoggedIn ? "LOGIN" : "LOGOUT" })
    ),
  }
}

