import { FC } from "react";
import { VALIDATE_CHAR_FORM_REGISTRATION } from "@/constants/constants";

const {
  MIN_CHAR_LOGIN,
  MAX_CHAR_LOGIN,
  MIN_CHAR_PASSWORD,
  MAX_CHAR_PASSWORD,
  MIN_CHAR_NAME_USER,
  MAX_CHAR_NAME_USER,
} = VALIDATE_CHAR_FORM_REGISTRATION;

import { Button, Form, Input } from "antd";
import { AuthFormsProps, UserRegistration } from "@/types/types";
import { signUp } from "@/api/api.crud";

export const SignUpForm: FC<AuthFormsProps> = ({ onToggleForm }) => {
  const [form] = Form.useForm<UserRegistration>();

  async function submmitSignUpForm(dataUserRegistration: UserRegistration) {
    await signUp(dataUserRegistration);

    form.resetFields();
  }

  return (
    <Form
      form={form}
      name="register"
      onFinish={submmitSignUpForm}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="login"
        label="login"
        rules={[
          { required: true, message: "Please input your login!" },
          { min: MIN_CHAR_LOGIN, message: `Минимум ${MIN_CHAR_LOGIN} символа` },
          {
            max: MAX_CHAR_LOGIN,
            message: `Максимум ${MAX_CHAR_LOGIN} символов`,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="username"
        label="username"
        rules={[
          {
            required: true,
            message: "Please input your userName!",
          },
          {
            min: MIN_CHAR_NAME_USER,
            message: `Минимум ${MIN_CHAR_NAME_USER} символа`,
          },
          {
            max: MAX_CHAR_NAME_USER,
            message: `Максимум ${MAX_CHAR_NAME_USER} символов`,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            min: MIN_CHAR_PASSWORD,
            message: `Минимум ${MIN_CHAR_PASSWORD} символа`,
          },
          {
            max: MAX_CHAR_PASSWORD,
            message: `Максимум ${MAX_CHAR_PASSWORD} символов`,
          },
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item label="phoneNumber" name="phoneNumber">
        <Input style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={onToggleForm}>авторизироватся</Button>
      </Form.Item>
    </Form>
  );
};
