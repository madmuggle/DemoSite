import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Icon } from "antd";
import reqSvc from "./reqSvc";

import "../css/Header.css";


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
    case "logout":
      this.reqLogout();
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

  headerMenu = () => {
    if (this.props.isLoggedIn)
      return (
        <Menu onClick={this.handleClick} mode="horizontal">
          {this.homepage()}
          {this.email()}
          {this.logout()}
        </Menu>
      );
    else
      return (
        <Menu onClick={this.handleClick} mode="horizontal">
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

