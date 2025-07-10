import { useEffect } from "react";
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
import { UserRegistration } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/ducks/hooks";
import { signUp } from "@/ducks/auth";
import { clearError, toggleForm } from "@/ducks/auth/slice";

export const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<UserRegistration>();
  const { error, authenticated } = useAppSelector((state) => state.auth);

  async function submmitSignUpForm(dataUserRegistration: UserRegistration) {
    await dispatch(signUp(dataUserRegistration));

    form.resetFields();
  }

  useEffect(() => {
    if (authenticated) {
      dispatch(clearError());
      dispatch(toggleForm(false));
    }
  }, [authenticated, dispatch]);

  const switchForm = (isRegForm: boolean) => {
    dispatch(clearError());
    dispatch(toggleForm(isRegForm));
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={submmitSignUpForm}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      {error && (
        <div>
          {error}

          <button type="button" onClick={() => dispatch(clearError())}>
            &times;
          </button>
        </div>
      )}

      <Form.Item
        name="username"
        label="имя пользоватиля"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите свое имя пользователя!",
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
        name="email"
        label="Почта"
        rules={[
          {
            type: "email",
            message: "Введите корректный адрес электронной почты!",
          },
          {
            required: true,
            message: "Пожалуйста, введите свой адрес электронной почты!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="login"
        label="Логин"
        rules={[
          {
            pattern: /^[a-zA-Z]+$/,
            message: "Пожалуйста, вводите только латинские буквы.",
          },
          { required: true, message: "Пожалуйста, введите свой логин!" },
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
        name="password"
        label="пароль"
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
            message: "Пожалуйста, введите свой пароль!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Подтвердите пароль"
        // dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Пожалуйста, подтвердите свой пароль!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Пароли не совпадают !"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label="номер телефона" name="phoneNumber">
        <Input style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={() => switchForm(false)}>Авторизация</Button>
      </Form.Item>
    </Form>
  );
};
