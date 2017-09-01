import React, { Component } from 'react';
import { Table } from 'antd';
import reqSvc from "./reqSvc";
import "../css/Greeter.css";


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
      console.error("reqSvc failed:", e);
    }
  }

  componentDidMount() {
    this.reqYourInfo().catch(console.error);
  }

  render() {
    const { yourInfo } = this.state;
    if (!yourInfo)
      return (
        <div className="data-center Greeter">
          Your personal infomation will be shown here after you logged in.
        </div>
      );
    else
      return (
        <div className="data-center">
          <Table columns={this.columns} dataSource={[ yourInfo ]} />
        </div>
      );
  }
}

export default Greeter;
