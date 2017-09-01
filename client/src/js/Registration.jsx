import React, { Component } from "react";
import { Input, Button, Icon, Form, Checkbox } from "antd";
import { Link } from "react-router-dom";
import reqSvc from "./reqSvc";
import "../css/Registration.css";

const FormItem = Form.Item;


class RegistrationForm extends Component {

  state = {
    emailValidateStatus: null,
  }

  help = {
    emailValidating: null,
  }

  createUser = async userInfo => {
    try {
      const r = await reqSvc({ action: "CreateUser", data: userInfo });
      if (r.status === "ok")
        return "SUCCEED";
      else
        return "FAIL";
    } catch (e) {
      console.error("reqSvc failed:", e);
      return "REQUESTFAIL";
    }
  }

  changeStateByReqResult = result => {
    switch (result) {
    case "SUCCEED":
      this.setState({ emailValidateStatus: "success" });
      break;

    case "FAIL":
      this.help.emailValidating = "This email has registered before.";
      this.setState({ emailValidateStatus: "error" });
      break;

    case "REQUESTFAIL":
      this.help.emailValidating = "Server is busy, try it later.";
      this.setState({ emailValidateStatus: "error" });
      break;

    default:
      console.error("Unknown request result:", result);
    }
  }

  handleSubmmit = e => {
    e.preventDefault();

    this.help.emailValidating = "Validating email, please wait.";
    this.setState({ emailValidateStatus: "validating" });

    this.props.form.validateFields((e, vals) => {
      if (e)
        return console.log("Form validating failed:", e);

      this.createUser(vals).then(this.changeStateByReqResult);
    });
  }

  checkPassword(rules, value, callback) {
    if (value && (value.length < 6 || value.indexOf(' ') !== -1))
      callback("Password have to be 6 non-space characters");
    else
      callback();
  }

  checkPasswordMatch = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password"))
      callback("The 2 passwords you typed is inconsistent!");
    else
      callback();
  }

  emailItemSub = () => {
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

  emailItem = () => {
    if (this.state.emailValidateStatus !== null)
      return (
        <FormItem
          validateStatus={this.state.emailValidateStatus}
          help={this.help.emailValidating}
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

  passwordChkItem = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem>
        {getFieldDecorator("passwordChk", {
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

