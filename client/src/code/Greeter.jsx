import React, { Component } from 'react';
import { connect } from "react-redux";
import { Table } from 'antd';
import reqSvc from "./reqSvc";
import "../style/Greeter.less";


class Greeter extends Component {

  columns = [
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Name", dataIndex: "name", key: "name" },
  ]

  state = {
    yourInfo: null,
  }

  reqYourInfo = async () => {
    try {
      const r = await reqSvc({ action: "GetUserInfo" });
      if (r.status !== "success") {
        console.warn("Unexpected response:", r);
        return;
      }

      // Table dataSource need "key"
      r.data = Object.assign(r.data, { key: "blah" });

      console.log("Will show you info...");
      this.setState({ yourInfo: r.data });
    } catch (e) {
      console.warn("reqSvc failed:", e.message);
    }
  }

  componentDidMount() {
    this.reqYourInfo().catch(console.error);
  }

  render() {
    const { yourInfo } = this.state;
    if (this.props.isLoggedIn) {
      if (yourInfo)
        return (
          <div className="data-center">
            <Table columns={this.columns} dataSource={[ yourInfo ]} />
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
  }
}


export default connect(mapStateToProps)(Greeter);

