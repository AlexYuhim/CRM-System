import { getUserPages, updateUser } from "@/ducks/admin";
import { useAppDispatch, useAppSelector } from "@/ducks/hooks";
import { Button, Form, Input, message, Modal, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VALIDATE_CHAR_FORM_REGISTRATION } from "@/constants/constants";
import { phoneValidator } from "@/utils/phoneValidator";
import { UserRequest } from "@/types/types";
const { MIN_CHAR_NAME_USER, MAX_CHAR_NAME_USER } =
  VALIDATE_CHAR_FORM_REGISTRATION;

export function UserList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id, 10) : NaN;
  const handleBack = () => {
    navigate(-1);
  };
  const userPages = useAppSelector((state) => state.admin.user);
  const [form] = Form.useForm<UserRequest>();

  useEffect(() => {
    dispatch(getUserPages(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (userPages) {
      form.setFieldsValue({
        username: userPages.username,
        email: userPages.email,
        phoneNumber: userPages.phoneNumber,
      });
    }
  }, [userPages, form]);

  const [showEditFormUser, setShowEditFormUser] = useState<boolean>(false);
  const [editFields, setEditFields] = useState<UserRequest>({});
  const [messageApi, contextHolder] = message.useMessage();
  const handleClickBtnEditForm = (event: boolean) => {
    setShowEditFormUser(event);
  };

  async function editUser() {
    if (!form.isFieldsTouched()) {
      messageApi.open({
        type: "warning",
        content: "внесите изминения",
      });
      return;
    }
    try {
      await dispatch(updateUser({ userData: editFields, userId })).unwrap();

      handleClickBtnEditForm(false);

      dispatch(getUserPages(userId));
      messageApi.open({
        type: "success",
        content: "Профиль пользователя успешно обновлен.",
      });
      setEditFields({});
    } catch (error) {
      messageApi.open({
        type: "error",
        content: `${error}`,
      });
    }
  }
  const onValuesChange = (changedValues: Partial<UserRequest>) => {
    console.log("changedValues", changedValues);

    setEditFields((prev) => ({ ...prev, ...changedValues }));
  };
  console.log("editFields", editFields);

  return (
    <>
      {contextHolder}
      <Space>
        <button style={{ width: "200px" }} onClick={handleBack}>
          назад
        </button>
      </Space>
      <br />
      <br />
      <div>username пользвателя : {userPages.username}</div>
      <div>email пользвателя : {userPages.email}</div>
      <div>phoneNumber пользвателя : {userPages.phoneNumber}</div>
      <button
        style={{ width: 256 }}
        onClick={() => handleClickBtnEditForm(true)}
      >
        редактировать
      </button>
      {showEditFormUser && (
        <Form
          form={form}
          style={{ rowGap: "16px" }}
          layout="vertical"
          name="register"
          onFinish={editUser}
          scrollToFirstError
          onValuesChange={onValuesChange}
        >
          <Form.Item
            name="username"
            label="имя пользоватиля"
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
              {
                type: "email",
                message: "Введите корректный адрес электронной почты!",
              },
              {
                message: "Пожалуйста, введите свой адрес электронной почты!",
              },
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
            <Button disabled={false} type="primary" htmlType="submit">
              edit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
