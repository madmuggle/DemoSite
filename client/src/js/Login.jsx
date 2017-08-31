import React, { Component } from "react";
import { Input, Button, Icon, Form, Checkbox } from "antd";
import { Link } from "react-router-dom";
import "../css/Login.css";

const FormItem = Form.Item;

class LoginForm extends Component {

  handleSubmmit = e => {
    e.preventDefault();
    this.props.form.validateFields((e, vals) => {
      if (!e) {
        console.log("Received values of form:", vals);
      }
    });
  }

  nameItem = () => {
    const { getFieldDecorator } = this.props.form;
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

  passwordItem = () => {
    const { getFieldDecorator } = this.props.form;
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

  rememberItem = () => {
    const { getFieldDecorator } = this.props.form;
    return getFieldDecorator("remember", {
      valuePropName: "checked",
      initialValue: true,
    })(<Checkbox>Remember me</Checkbox>);
  }

  submitItem = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem>
        { this.rememberItem(getFieldDecorator) }
        <a className="login-form-forgot" href="">Forgot password</a>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to="/register">register now!</Link>
      </FormItem>
    );
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmmit} className="login-form">
        {this.nameItem()}
        {this.passwordItem()}
        {this.submitItem()}
      </Form>
    );
  }
}


export default Form.create()(LoginForm);

