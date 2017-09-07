import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Icon, Avatar } from "antd";
import reqSvc from "./reqSvc";

import "../style/Header.less";


const menuUrlKeyMap = {
  "/": "homepage",
  "/register" : "register",
  "/login": "login",
}

class Header extends Component {

  reqLogout = async () => {
    try {
      const r = await reqSvc({ action: "Logout" });
      if (r.status !== "success") {
        console.error("Failed logout:", r);
        return;
      }
      this.props.logoutAcknowledge();
    } catch (e) {
      console.error("reqSvc failed:", e);
    }
  }

  handleClick = e => {
    switch (e.key) {
    case "email":
      window.location = "mailto:wallacegibbon@aliyun.com";
      break;
    case "homepage":
      this.props.history.push("/");
      break;
    case "register":
      this.props.history.push("/register");
      break;
    case "login":
      this.props.history.push("/login");
      break;
    case "settings":
      this.props.history.push("/settings");
      break;
    case "notifications":
      this.props.history.push("/notifications");
      break;
    case "logout":
      this.reqLogout();
      break;
    default:
      console.error("Unknown Menu.Item key:", e.key);
    }
  }

  email = (
    <Menu.Item key="email">
      <div>
        <Icon type="mail" />Contact
      </div>
    </Menu.Item>
  )

  homepage = (
    <Menu.Item key="homepage">
      <div>
        <Icon type="home" />Homepage
      </div>
    </Menu.Item>
  )

  register = (
    <Menu.Item key="register">
      <div>
        <Icon type="user-add" />Register
      </div>
    </Menu.Item>
  )

  login = (
    <Menu.Item key="login">
      <div>
        <Icon type="login" />Login
      </div>
    </Menu.Item>
  )

  logout = (
    <Menu.Item key="logout">
      <div>
        <Icon type="logout" />Logout
      </div>
    </Menu.Item>
  )

  settings = (
    <Menu.Item key="settings">
      <div>
        <Icon type="setting" />Settings
      </div>
    </Menu.Item>
  )

  notifications = (
    <Menu.Item key="notifications">
      <div>
        <Icon type="bell" />Notifications
      </div>
    </Menu.Item>
  )

  user = (
    <Menu.SubMenu
      title={<span><Icon type="user" />User Related</span>}
    >
      <Menu.ItemGroup title="Main functions">
        {this.notifications}
        {this.settings}
      </Menu.ItemGroup>
      <Menu.ItemGroup title="Others">
        {this.logout}
      </Menu.ItemGroup>
    </Menu.SubMenu>
  )

  headerMenu = () => {
    const selectedKey = menuUrlKeyMap[this.props.location.pathname];
    if (this.props.isLoggedIn)
      return (
        <Menu
          onClick={this.handleClick}
          mode="horizontal"
          selectedKeys={[ selectedKey ]}
        >
          {this.homepage}
          {this.email}
          {this.user}
        </Menu>
      );
    else
      return (
        <Menu
          onClick={this.handleClick}
          mode="horizontal"
          selectedKeys={[ selectedKey ]}
        >
          {this.homepage}
          {this.email}
          {this.register}
          {this.login}
        </Menu>
      );
  }

  render() {
    return (
      <header className="header-main">
        <nav className="header-menu">
          {this.headerMenu()}
        </nav>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutAcknowledge: () => dispatch({ type: "LOGOUT" }),
  }
}


export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);

