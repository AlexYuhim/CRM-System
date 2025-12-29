import { VALIDATE_CHAR_FORM_REGISTRATION } from "@/shared/constants/constants.tsx";
import { Button, Form, Input } from "antd";
import { useUserEdit } from "../lib/hooks/useUserEdit.tsx";
import { useUserForm } from "../lib/hooks/useUserForm.tsx";
import { UserRequest } from "@/entities/user/model/types.ts";
import { phoneValidator } from "@/shared/utils/phoneValidator.ts";

const { MIN_CHAR_NAME_USER, MAX_CHAR_NAME_USER } =
  VALIDATE_CHAR_FORM_REGISTRATION;

interface UserEditFormProps {
  userId: number;
}

export const UserEditForm = ({ userId }: UserEditFormProps) => {
  const { user } = useUserEdit(userId);
  const { form, isEditing, handleEditClick, handleSubmit } = useUserForm(
    userId,
    user
  );

  const onFormSubmit = async (values: UserRequest) => {
    try {
      const successMessage = await handleSubmit(values);
      // Показать сообщение об успехе
      handleEditClick(false);
    } catch (error) {
      // Показать ошибку
    }
  };

  return (
    <>
      <div>username пользователя: {user?.username}</div>
      <div>email пользователя: {user?.email}</div>
      <div>phoneNumber пользователя: {user?.phoneNumber}</div>

      <button style={{ width: 256 }} onClick={() => handleEditClick(true)}>
        редактировать
      </button>

      {isEditing && (
        <Form
          form={form}
          style={{ rowGap: "16px" }}
          layout="vertical"
          name="register"
          onFinish={onFormSubmit}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="имя пользователя"
            rules={[
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
              { type: "email", message: "Введите корректный email!" },
              { required: true, message: "Введите email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="номер телефона"
            name="phoneNumber"
            rules={[{ validator: phoneValidator }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              отправить
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};
