import { useEffect, useState } from "react";
import { VALIDATE_CHAR_FORM_REGISTRATION } from "@/constants/constants";
import style from "./AuthLayout.module.css";

import { Button, Form, Modal, Input, message } from "antd";
import { UserRegistration } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/ducks/hooks";
import { signUp } from "@/ducks/auth";
import type { Rule } from "antd/es/form";
import { Link, useNavigate } from "react-router-dom";
const {
  MIN_CHAR_LOGIN,
  MAX_CHAR_LOGIN,
  MIN_CHAR_PASSWORD,
  MAX_CHAR_PASSWORD,
  MIN_CHAR_NAME_USER,
  MAX_CHAR_NAME_USER,
} = VALIDATE_CHAR_FORM_REGISTRATION;

const phoneValidator = (_: Rule, value: string) => {
  if (!value) return Promise.resolve();
  const regex = /^\+?[0-9\s\-\(\)]{10,15}$/;
  if (!regex.test(value)) {
    return Promise.reject("Некорректный формат телефона");
  }
  return Promise.resolve();
};

export const SignUpForm = () => {
  const [isModalSucessOpen, setIsModalSucessOpen] = useState(false);
  const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<UserRegistration>();
  const { error, authenticated } = useAppSelector((state) => state.auth);

  async function submmitSignUpForm(dataUserRegistration: UserRegistration) {
    try {
      await dispatch(signUp(dataUserRegistration)).unwrap();
      setIsModalSucessOpen(true);
      form.resetFields();
    } catch (error) {
      setIsModalErrorOpen(true);
    }
  }

  const handleOkSucessModal = () => {
    setIsModalSucessOpen(false);
    navigate("/auth/login");
  };
  const handleCancelSucessModal = () => {
    setIsModalSucessOpen(false);
  };
  const handleOkErr = () => {
    setIsModalErrorOpen(false);
  };

  return (
    <>
      <div className={style.titleText}>
        <div>
          <h3>Зарегистрируйте свою учетную запись</h3>
          <h5>Начните следить, что происходит с вашим бизнесом</h5>
        </div>
      </div>
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
          rules={[{ validator: phoneValidator }]}
        >
          <Input placeholder="+7 (999) 123-45-67" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Успешная регистрация!"
        open={isModalSucessOpen}
        onOk={handleOkSucessModal}
        onCancel={handleCancelSucessModal}
        footer={[
          <Button key="stay" onClick={handleCancelSucessModal}>
            Зарегистрировать еще одного
          </Button>,
          <Button key="login" type="primary" onClick={handleOkSucessModal}>
            Перейти к авторизации
          </Button>,
        ]}
      >
        <p>Вы успешно зарегистрировались. Хотите войти в систему?</p>
      </Modal>
      <Modal
        title="Ошибка регистрация!"
        open={isModalErrorOpen}
        onOk={handleOkErr}
        footer={[
          <Button key="login" type="primary" onClick={handleOkErr}>
            OK
          </Button>,
        ]}
      >
        <p>{error}</p>
      </Modal>
      <div className={style.linkSwitchForm}>
        <Link to="/auth/login">Авторизация</Link>
      </div>
    </>
  );
};
