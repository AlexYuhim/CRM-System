import { VALIDATE_CHAR_FORM_REGISTRATION } from "@/constants/constants";
import { signIn } from "@/ducks/auth";
import { useAppDispatch } from "@/ducks/hooks";
import { AuthData, AuthFormsProps } from "@/types/types";
import { Button, Form, Input } from "antd";

const { MIN_CHAR_LOGIN, MAX_CHAR_LOGIN, MIN_CHAR_PASSWORD, MAX_CHAR_PASSWORD } =
  VALIDATE_CHAR_FORM_REGISTRATION;

export const SignInForm: React.FC<AuthFormsProps> = ({ onToggleForm }) => {
  const [form] = Form.useForm<AuthData>();
  const dispatch = useAppDispatch();

  const submmitSignInForm = (authData: AuthData) => {
    console.log("hi SignInForm");

    dispatch(signIn(authData));

    // form.resetFields();
  };
  return (
    <Form
      form={form}
      name="register"
      onFinish={submmitSignInForm}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
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
          auth
        </Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={onToggleForm}>авторизироватся</Button>
      </Form.Item>
    </Form>
  );
};
