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

  showTable(dataSource) {
    return (
      <div className="data-center">
        <Table columns={tableColumns} dataSource={dataSource} />
      </div>
    );
  }

  showNotLoggedIn() {
    return (
      <div className="data-center Greeter">
        You are not logged in yet, please log in first.
      </div>
    );
  }

  render() {
    const { userInfo, isLoggedIn } = this.props;
    if (isLoggedIn)
      return this.showTable([ Object.assign({}, userInfo, { key: "_1" }) ]);
    else
      return this.showNotLoggedIn();
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
    userInfo: state.userInfo,
  };
}


export default connect(mapStateToProps)(Greeter);

