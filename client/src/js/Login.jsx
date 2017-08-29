import React, { Component } from 'react';
import { Input, Button } from 'antd';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <Input size="large" placeholder="name" /><br />
        <Input size="large" placeholder="password" /><br />
        <Button type="primary">Login</Button>
      </div>
    );
  }
}

export default Login;
