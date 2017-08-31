import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";
import "../css/Header.css";


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
    default:
      console.error("Unknown Menu.Item key:", e.key);
    }
  }

  render() {
    return (
      <header className="header-main">
        <nav className="header-menu">
          <Menu onClick={this.handleClick} mode="horizontal">
            <Menu.Item key="homepage">
              <div>
                <Icon type="home" />Homepage
              </div>
            </Menu.Item>
            <Menu.Item key="email">
              <div>
                <Icon type="mail" />Contact
              </div>
            </Menu.Item>
            <Menu.Item key="register">
              <div>
                <Icon type="user-add" />Register
              </div>
            </Menu.Item>
            <Menu.Item key="login">
              <div>
                <Icon type="login" />Login
              </div>
            </Menu.Item>
          </Menu>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
