import { useEffect } from "react";
import { VALIDATE_CHAR_FORM_REGISTRATION } from "@/constants/constants";
import style from "./AuthLayout.module.css";

import { Button, Form, Input } from "antd";
import { UserRegistration } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/ducks/hooks";
import { signUp } from "@/ducks/auth";
import { clearError, toggleForm } from "@/ducks/auth/slice";
import type { Rule } from "antd/es/form";
const {
  MIN_CHAR_LOGIN,
  MAX_CHAR_LOGIN,
  MIN_CHAR_PASSWORD,
  MAX_CHAR_PASSWORD,
  MIN_CHAR_NAME_USER,
  MAX_CHAR_NAME_USER,
} = VALIDATE_CHAR_FORM_REGISTRATION;

const phoneValidator = (_: Rule, value: string) => {
  if (!value) return Promise.reject("Введите номер телефона");
  const regex = /^\+?[0-9\s\-\(\)]{10,15}$/;
  if (!regex.test(value)) {
    return Promise.reject("Некорректный формат телефона");
  }
  return Promise.resolve();
};

export const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<UserRegistration>();
  const { error, authenticated, formData } = useAppSelector(
    (state) => state.auth
  );

  async function submmitSignUpForm(dataUserRegistration: UserRegistration) {
    await dispatch(signUp(dataUserRegistration));
  }

  useEffect(() => {
    if (authenticated) {
      dispatch(clearError());
      dispatch(toggleForm(false));
    }
  }, [authenticated, dispatch]);

  return (
    <>
      {error && (
        <div className={style.errorMessage}>
          {error}

          <button type="button" onClick={() => dispatch(clearError())}>
            &times;
          </button>
        </div>
      )}
      <Form
        form={form}
        style={{ rowGap: "16px" }}
        layout="vertical"
        name="register"
        onFinish={submmitSignUpForm}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="имя пользоватиля"
          initialValue={formData?.username}
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
          initialValue={formData?.email}
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
          initialValue={formData?.login}
          rules={[
            {
              pattern: /^[a-zA-Z]+$/,
              message: "Пожалуйста, вводите только латинские буквы.",
            },
            { required: true, message: "Пожалуйста, введите свой логин!" },
            {
              min: MIN_CHAR_LOGIN,
              message: `Минимум ${MIN_CHAR_LOGIN} символа`,
            },
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
          initialValue={formData?.password}
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
          initialValue={formData?.password}
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

        <Form.Item
          label="номер телефона"
          name="phoneNumber"
          initialValue={formData?.phoneNumber}
          rules={[
            { required: true, message: "Обязательное поле" },
            { validator: phoneValidator },
          ]}
        >
          <Input placeholder="+7 (999) 123-45-67" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
