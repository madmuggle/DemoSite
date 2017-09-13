import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Icon, Avatar, message } from "antd";
import withReqSvc from "./withReqSvc";

import "../style/Header.less";


const menuUrlKeyMap = {
  "/": "homepage",
  "/register" : "register",
  "/login": "login",
}

class Header extends Component {

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
      this.props.reqLogout();
      this.props.history.push("/");
      break;

    default:
      console.error("Unknown Menu.Item key:", e.key);
    }
  }

  email() {
    return (
      <Menu.Item key="email">
        <div>
          <Icon type="mail" />Contact
        </div>
      </Menu.Item>
    );
  }

  homepage() {
    return (
      <Menu.Item key="homepage">
        <div>
          <Icon type="home" />Homepage
        </div>
      </Menu.Item>
    );
  }

  register() {
    return (
      <Menu.Item key="register">
        <div>
          <Icon type="user-add" />Register
        </div>
      </Menu.Item>
    );
  }

  login() {
    return (
      <Menu.Item key="login">
        <div>
          <Icon type="login" />Login
        </div>
      </Menu.Item>
    );
  }

  logout() {
    return (
      <Menu.Item key="logout">
        <div>
          <Icon type="logout" />Logout
        </div>
      </Menu.Item>
    );
  }

  settings() {
    return (
      <Menu.Item key="settings">
        <div>
          <Icon type="setting" />Settings
        </div>
      </Menu.Item>
    );
  }

  notifications() {
    return (
      <Menu.Item key="notifications">
        <div>
          <Icon type="bell" />Notifications
        </div>
      </Menu.Item>
    );
  }

  getUserName() {
    return this.props.userInfo ? this.props.userInfo.name : "...";
  }

  userShow() {
    return (
      <span>
        <Icon type="user" />{trimName(this.getUserName())}
      </span>
    )
  }

  user() {
    return (
      <Menu.SubMenu title={this.userShow()}>
        <Menu.ItemGroup title="Main functions">
          {this.notifications()}
          {this.settings()}
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Others">
          {this.logout()}
        </Menu.ItemGroup>
      </Menu.SubMenu>
    );
  }

  headerMenu() {
    const selectedKey = menuUrlKeyMap[this.props.location.pathname];
    if (this.props.isLoggedIn)
      return (
        <Menu
          onClick={this.handleClick}
          mode="horizontal"
          selectedKeys={[ selectedKey ]}
        >
          {this.homepage()}
          {this.email()}
          {this.user()}
        </Menu>
      );
    else
      return (
        <Menu
          onClick={this.handleClick}
          mode="horizontal"
          selectedKeys={[ selectedKey ]}
        >
          {this.homepage()}
          {this.email()}
          {this.register()}
          {this.login()}
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

function trimName(nameStr) {
  const limitNameSize = 20;
  if (nameStr && nameStr.length > limitNameSize + 3)
    return nameStr.slice(0, limitNameSize) + "..."
  else
    return nameStr;
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
    userInfo: state.userInfo,
  }
}

export default withRouter(
  connect(mapStateToProps)(withReqSvc(Header))
);

