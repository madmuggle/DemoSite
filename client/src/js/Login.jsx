import React, { Component } from 'react';
import { Input, Button, Icon, Form, Checkbox } from 'antd';
import "../css/Login.css";

const FormItem = Form.Item;

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmmit = this.handleSubmmit.bind(this);
  }

  handleSubmmit(e) {
    e.preventDefault();
    this.props.form.validateFields((e, vals) => {
      if (!e) {
        console.log("Received values of form:", vals);
      }
    });
  }

  nameItem(getFieldDecorator) {
    return (
      <FormItem>
        {getFieldDecorator("username", {
          rules: [{ required: true, message: "Please input your user name!" }],
        })(
          <Input
            prefix={<Icon type="user" style={{ fontSize: 13 }} />}
            placeholder="Username"
          />
        )}
      </FormItem>
    );
  }

  passwordItem(getFieldDecorator) {
    return (
      <FormItem>
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please input your password!" }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </FormItem>
    );
  }

  rememberItem(getFieldDecorator) {
    return getFieldDecorator("remember", {
      valuePropName: "checked",
      initialValue: true,
    })(<Checkbox>Remember me</Checkbox>);
  }

  submitItem(getFieldDecorator) {
    return (
      <FormItem>
        { this.rememberItem(getFieldDecorator) }
        <a className="login-form-forgot" href="">Forgot password</a>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </FormItem>
    );
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmmit} className="login-form">
        {this.nameItem(getFieldDecorator)}
        {this.passwordItem(getFieldDecorator)}
        {this.submitItem(getFieldDecorator)}
      </Form>
    );
  }
}


export default Form.create()(LoginForm);

