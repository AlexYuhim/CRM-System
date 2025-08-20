import { VALIDATE_CHAR_FORM_REGISTRATION } from "@/constants/constants";
import { signIn } from "@/ducks/auth";
import { useAppDispatch, useAppSelector } from "@/ducks/hooks";
import { AuthData } from "@/types/types";
import { Button, Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "./AuthLayout.module.css";

const { MIN_CHAR_LOGIN, MAX_CHAR_LOGIN, MIN_CHAR_PASSWORD, MAX_CHAR_PASSWORD } =
  VALIDATE_CHAR_FORM_REGISTRATION;

export const SignInForm = () => {
  const [form] = Form.useForm<AuthData>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticated, error } = useAppSelector((store) => store.auth);

  const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

  useEffect(() => {
    if (authenticated) {
      const from = location.state?.from?.pathname || "/todos";
      navigate(from, { replace: true });
    }
  }, [authenticated, navigate, location]);

  async function submmitSignInForm(authData: AuthData) {
    try {
      await dispatch(signIn(authData)).unwrap();
      form.resetFields();
    } catch (error) {
      setIsModalErrorOpen(true);
    }
  }

  const handleOkErr = () => {
    setIsModalErrorOpen(false);
  };
  return (
    <>
      <div className={style.titleText}>
        <div>
          <h3>Войдите в свою учетную запись</h3>
          <h5>Посмотрите, что происходит с вашим бизнесом</h5>
        </div>
      </div>
      <Form
        form={form}
        style={{ rowGap: "16px" }}
        layout="vertical"
        name="register"
        onFinish={submmitSignInForm}
        scrollToFirstError
      >
        <Form.Item
          name="login"
          label="login"
          rules={[
            { required: true, message: "Please input your login!" },
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>

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
        <Link to="/auth/register">Регистрация</Link>
      </div>
    </>
  );
};
