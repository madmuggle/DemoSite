import React, { Component } from "react";
import { Input, Button, Icon, Form, Checkbox, message } from "antd";
import { Link } from "react-router-dom";
import withReqSvc from "./withReqSvc";

import "../style/Registration.less";

const FormItem = Form.Item;


class RegistrationForm extends Component {

  state = {
    emailValidateStatus: null,
    passwordChkNeedUpdate: false,
  }

  help = {
    emailInfo: null,
  }

  changeStateByReqResult = result => {
    switch (result) {
    case "REQUEST_FAIL":
      this.stateServerError();
      break;

    case "REGISTERED_BEFORE":
      this.stateRegisteredBefore();
      break;

    case "SUCCESS":
      this.stateSuccess();
      this.props.history.push("/");
      break;

    default:
      console.error("Unknown request result:", result);
    }
  }

  stateServerError() {
    this.help.emailInfo = "Server is busy, try it later.";
    this.setState({ emailValidateStatus: "warning" });
  }

  stateRegisteredBefore() {
    this.help.emailInfo = "This email has registered before.";
    this.setState({ emailValidateStatus: "error" });
  }

  stateSuccess() {
    message.success("You have just created a new account.");
    /*
    this.help.emailInfo = "";
    this.setState({ emailValidateStatus: "success" });
    */
  }

  stateCheckingEmail() {
    this.help.emailInfo = "Checking email, please wait.";
    this.setState({ emailValidateStatus: "validating" });
  }

  handleSubmmit = e => {
    e.preventDefault();

    this.props.form.validateFields((e, vals) => {
      if (e)
        return console.log("Form validating failed:", e);

      this.stateCheckingEmail();
      this.props.reqCreateUser(vals).then(this.changeStateByReqResult);
    });
  }

  checkPassword = (rules, value, callback) => {
    const form = this.props.form;
    if (value) {
      if (value.length < 6 || value.indexOf(' ') !== -1) {
        callback("Password have to be 6 non-space characters");
      } else if (value !== form.getFieldValue("passwordChk")) {
        this.setState({ passwordChkNeedUpdate: true });
        callback();
      } else {
        this.setState({ passwordChkNeedUpdate: false });
        callback();
      }
    } else {
      callback(); }
  }

  checkPasswordMatch = (rule, value, callback) => {
    // Coming from password field, you need to render a normal passwordChk
    // item first.
    if (this.state.passwordChkNeedUpdate)
      this.setState({ passwordChkNeedUpdate: false });

    const form = this.props.form;
    if (value && value !== form.getFieldValue("password"))
      callback("The 2 passwords you typed is inconsistent!");
    else
      callback();
  }

  emailItemSub() {
    const { getFieldDecorator } = this.props.form;
    return (
      getFieldDecorator("email", {
        rules: [
          { required: true, message: "Please input your email address!" },
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

  nameItem() {
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

  passwordItem() {
    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem>
        {getFieldDecorator("password", {
          rules: [
            { required: true, message: "Please input your password!" },
            { validator: this.checkPassword },
          ],
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

  passwordChkItemSub() {
    const { getFieldDecorator } = this.props.form;
    return (
      getFieldDecorator("passwordChk", {
        rules: [
          { required: true, message: "Input your password again!" },
          { validator: this.checkPasswordMatch },
        ],
      })(
        <Input
          prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
          type="password"
          placeholder="Retype password"
        />
      )
    );
  }

  passwordChkItem() {
    if (this.state.passwordChkNeedUpdate)
      return (
        <FormItem
          validateStatus="error"
          help="Password input updated, update this, too."
          hasFeedback
        >
          {this.passwordChkItemSub()}
        </FormItem>
      );
    else
      return (
        <FormItem>
          {this.passwordChkItemSub()}
        </FormItem>
      );
  }

  submitItem() {
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


export default withReqSvc(Form.create()(RegistrationForm));

