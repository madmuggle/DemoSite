import React, { Component } from 'react';
import { connect } from "react-redux";
import { Table } from 'antd';
import reqSvc from "./reqSvc";
import { normalizeNameSpell } from "./utils";

import "../style/Greeter.less";


const tableColumns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
];


class Greeter extends Component {

  async reqYourInfo() {
    try {
      const r = await reqSvc({ action: "GetUserInfo" });
      if (r.status !== "success") {
        console.warn("Unexpected response:", r);
        return;
      }

      // Table dataSource need "key"
      r.data.key = r.data.email;
      r.data.name = normalizeNameSpell(r.data.name);

      console.log("Will show you info...");
      this.props.setUserInfo(r.data);
    } catch (e) {
      console.warn("reqSvc failed:", e.message);
      this.props.logInfoAcknowledge(false);
    }
  }

  componentDidMount() {
    this.reqYourInfo().catch(console.error);
  }

  render() {
    const { userInfo, isLoggedIn } = this.props;
    if (isLoggedIn) {
      if (userInfo)
        return (
          <div className="data-center">
            <Table columns={tableColumns} dataSource={[ userInfo ]} />
          </div>
        );
      else
        return (
          <div className="data-center Greeter">
            Fetching you personal information from server now...
          </div>
        );
    } else {
      return (
        <div className="data-center Greeter">
          You are not logged in yet, please log in first.
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
    userInfo: state.userInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserInfo: (userInfo) => (
      dispatch({ type: "SETUSERINFO", data: userInfo })
    ),
    logInfoAcknowledge: isLoggedIn => (
      dispatch({ type: isLoggedIn ? "LOGIN" : "LOGOUT" })
    ),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Greeter);

