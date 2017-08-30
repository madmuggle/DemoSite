import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
import "../css/Header.css";


class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log("click:", e);
  }

  render() {
    return (
      <header className="header-main">
        <nav className="header-menu">
          <Menu onClick={this.handleClick} mode="horizontal">
            <Menu.Item key="home">
              <div>
                <Icon type="coffee" /><Link to="/">Homepage</Link>
              </div>
            </Menu.Item>
            <Menu.Item key="register">
              <div>
                <Icon type="user-add" /><Link to="/register">Register</Link>
              </div>
            </Menu.Item>
            <Menu.Item key="login">
              <div>
                <Icon type="user-add" /><Link to="/login">Login</Link>
              </div>
            </Menu.Item>
          </Menu>
        </nav>
      </header>
    );
  }
}

export default Header;
