import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Input, Button, Icon, Form, Checkbox } from "antd";
import reqSvc from "./reqSvc";
import { normalizeNameSpell } from "./utils";

import "../style/Login.less";

const FormItem = Form.Item;

class LoginForm extends Component {

  state = {
    emailValidateStatus: null,
    passwordValidateStatus: null,
  }

  help = {
    emailInfo: null,
    passwordInfo: null,
  }

  async updateUserInfo() {
    try {
      const r = await reqSvc({ action: "GetUserInfo" });
      if (r.status !== "success") {
        console.warn("Unexpected response:", r);
        return;
      }

      r.data.name = normalizeNameSpell(r.data.name);

      this.props.updateUserInfo(r.data);
      this.props.logInfoAcknowledge(true);
    } catch (e) {
      console.warn("reqSvc failed:", e.message);
      this.props.logInfoAcknowledge(false);
    }
  }

  async reqLogin(userInfo) {
    try {
      const r = await reqSvc({ action: "Login", data: userInfo });
      if (r.status === "success")
        return "SUCCESS";
      else
        return r.type;
    } catch (e) {
      console.warn("reqSvc failed:", e);
      return "REQUEST_FAIL";
    }
  }

  stateServerError() {
    this.help.emailInfo = "Server is busy, try it later.";
    this.help.passwordInfo = "";

    this.setState({
      emailValidateStatus: "warning",
      passwordValidateStatus: "warning",
    });
  }

  stateUnregister() {
    this.help.emailInfo = "This email is not registered yet.";
    this.help.passwordInfo = "";

    this.setState({
      emailValidateStatus: "error",
      passwordValidateStatus: "error",
    });
  }

  stateWrongPassword() {
    this.help.passwordInfo = "password doesn't match the account.";
    this.help.emailInfo = "";

    this.setState({
      emailValidateStatus: "error",
      passwordValidateStatus: "error",
    });
  }

  stateSuccess() {
    this.updateUserInfo();
    this.props.history.push("/");
    /*
    this.help.passwordInfo = "";
    this.help.emailInfo = "";

    this.setState({
      emailValidateStatus: "success",
      passwordValidateStatus: "success",
    });
    */
  }

  stateLoggingIn() {
    this.help.emailInfo = "Trying to login, please wait.";
    this.help.passwordInfo = "";

    this.setState({
      emailValidateStatus: "validating",
      passwordValidateStatus: "validating",
    });
  }

  changeStateByReqResult = result => {
    switch (result) {
    case "REQUEST_FAIL":
      this.stateServerError();
      break;

    case "UNREGISTER":
      this.stateUnregister();
      break;

    case "WRONG_PASSWORD":
      this.stateWrongPassword();
      break;

    case "SUCCESS":
      this.stateSuccess();
      break;

    default:
      console.error("Unknown request result:", result);
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((e, vals) => {
      if (e)
        return console.log("Form validating failed:", e);

      this.stateLoggingIn();
      this.reqLogin(vals).then(this.changeStateByReqResult);
    });
  }

  emailItemSub() {
    const { getFieldDecorator } = this.props.form;
    return (
      getFieldDecorator("email", {
        rules: [
          { required: true, message: "Input your email address!" },
          { type: "email", message: "E-mail address invalid" },
        ],
      })(
        <Input
          prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
          placeholder="Email address"
        />
      )
    );
  }

  emailItem() {
    if (this.state.emailValidateStatus !== null)
      return (
        <FormItem
          validateStatus={this.state.emailValidateStatus}
          help={this.help.emailInfo}
          hasFeedback
        >
          {this.emailItemSub()}
        </FormItem>
      );
    else
      return (
        <FormItem>
          {this.emailItemSub()}
        </FormItem>
      );
  }

  passwordItemSub() {
    const { getFieldDecorator } = this.props.form;
    return (
      getFieldDecorator("password", {
        rules: [{ required: true, message: "Input your password!" }],
      })(
        <Input
          prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
          type="password"
          placeholder="Password"
        />
      )
    );
  }

  passwordItem() {
    if (this.state.passwordValidateStatus !== null)
      return (
        <FormItem
          validateStatus={this.state.passwordValidateStatus}
          help={this.help.passwordInfo}
          hasFeedback
        >
          {this.passwordItemSub()}
        </FormItem>
      );
    else
      return (
        <FormItem>
          {this.passwordItemSub()}
        </FormItem>
      );
  }

  rememberItem() {
    const { getFieldDecorator } = this.props.form;
    return (
      getFieldDecorator("remember", {
        valuePropName: "checked",
        initialValue: true,
      })(<Checkbox>Remember me</Checkbox>)
    );
  }

  submitItem() {
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
      <Form onSubmit={this.handleSubmit} className="login-form">
        {this.emailItem()}
        {this.passwordItem()}
        {this.submitItem()}
      </Form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserInfo: (userInfo) => (
      dispatch({ type: "UPDATE_USERINFO", data: userInfo })
    ),
    logInfoAcknowledge: isLoggedIn => (
      dispatch({ type: isLoggedIn ? "LOGIN" : "LOGOUT" })
    ),
  }
}

export default connect(null, mapDispatchToProps)(
  Form.create()(LoginForm)
);

