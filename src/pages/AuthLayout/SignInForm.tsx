import { VALIDATE_CHAR_FORM_REGISTRATION } from "@/constants/constants";
import { signIn } from "@/ducks/auth";
import { clearError, showPopUp, toggleForm } from "@/ducks/auth/slice";
import { useAppDispatch, useAppSelector } from "@/ducks/hooks";
import { AuthData } from "@/types/types";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { MIN_CHAR_LOGIN, MAX_CHAR_LOGIN, MIN_CHAR_PASSWORD, MAX_CHAR_PASSWORD } =
  VALIDATE_CHAR_FORM_REGISTRATION;

export const SignInForm = () => {
  const [form] = Form.useForm<AuthData>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticated, error, isShowPopUp } = useAppSelector(
    (store) => store.auth
  );
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (authenticated) {
      dispatch(toggleForm(false));
    }
  }, [authenticated, dispatch]);

  const switchShowPopup = (show: boolean) => {
    dispatch(showPopUp(show));
  };

  const switchForm = (isRegForm: boolean) => {
    dispatch(clearError());
    dispatch(toggleForm(isRegForm));
  };

  const submmitSignInForm = (authData: AuthData) => {
    dispatch(signIn(authData)).unwrap();

    const from = location.state?.from?.pathname || "/todos";
    navigate(from, { replace: true });

    if (authenticated) {
      const from = location.state?.from?.pathname;
      navigate(from, { replace: true });
    }
    form.resetFields();
  };

  if (isShowPopUp) {
    return (
      <>
        <h3>вы успешно зарегистрировались</h3>
        <Link to="" onClick={() => switchShowPopup(false)}>
          прейдите по ссылки для авторизации
        </Link>
      </>
    );
  } else {
    return (
      <Form
        form={form}
        name="register"
        onFinish={submmitSignInForm}
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
        <Form.Item>
          <Button onClick={() => switchForm(true)}>Регистрация</Button>
        </Form.Item>
      </Form>
    );
  }
};
