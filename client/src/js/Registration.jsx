import React, { Component } from "react";
import { Input, Button, Icon, Form, Checkbox } from "antd";
import { Link } from "react-router-dom";
import reqSvc from "./reqSvc";
import "../css/Registration.css";

const FormItem = Form.Item;

class RegistrationForm extends Component {

  async createUser(userInfo) {
    const r = await reqSvc({ action: "CreateUser", data: userInfo });
    if (r.status !== "ok")
      console.error("Failed creating user.");
    else
      console.log("Succeed creating user.");
  }

  handleSubmmit = e => {
    e.preventDefault();
    this.props.form.validateFields((e, vals) => {
      if (!e) {
        this.createUser(vals);
      }
    });
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password"))
      callback("The 2 passwords you typed is inconsistent!");
    else
      callback();
  }

  emailItem = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem>
        {getFieldDecorator("email", {
          rules: [
            { required: true, message: "Please input your email address!" },
            { type: "email", message: "E-mail address invalid" },
          ],
        })(
          <Input
            prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
            placeholder="Email address"
          />
        )}
      </FormItem>
    );
  }

  nameItem = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem>
        {getFieldDecorator("name", {
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

  passwordChkItem = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem>
        {getFieldDecorator("passwordChk", {
          rules: [
            { required: true, message: "Input your password again!" },
            { validator: this.checkPassword },
          ],
        })(
          <Input
            prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
            type="password"
            placeholder="Retype password"
          />
        )}
      </FormItem>
    );
  }

  submitItem = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem>
        <Button
          type="primary" htmlType="submit" className="register-form-button"
        >
          Register
        </Button>
        Already registered? Just <Link to="/login">log in.</Link>
      </FormItem>
    );
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmmit} className="register-form">
        {this.emailItem()}
        {this.nameItem()}
        {this.passwordItem()}
        {this.passwordChkItem()}
        {this.submitItem()}
      </Form>
    );
  }
}


export default Form.create()(RegistrationForm);

