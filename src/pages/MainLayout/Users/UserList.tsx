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
  console.log("userPages", userPages);

  useEffect(() => {
    dispatch(getUserPages(userId));
  }, [dispatch]);

  const [showEditFormUser, setShowEditFormUser] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const handleClickBtnEditForm = (event: boolean) => {
    setShowEditFormUser(event);
  };
  const [form] = Form.useForm<UserRequest>();

  async function submmitEditUserForm(dataUserRequset: UserRequest) {
    try {
      await dispatch(
        updateUser({ userData: dataUserRequset, userId })
      ).unwrap();

      handleClickBtnEditForm(false);

      messageApi.open({
        type: "success",
        content: "Профиль пользователя успешно обновлен.",
      });
      dispatch(getUserPages(userId));
    } catch (error) {
      messageApi.open({
        type: "error",
        content: `${error}`,
      });
    }
  }

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
      <div>id пользвателя {`${id}`}</div>
      получено с бека :<div>username пользвателя : {userPages.username}</div>
      <div>email пользвателя : {userPages.email}</div>
      <div>isBlocked пользвателя : {userPages.isBlocked.toString()}</div>
      <div>phoneNumber пользвателя : {userPages.phoneNumber}</div>
      <div>roles пользвателя : {userPages.roles}</div>
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
          onFinish={submmitEditUserForm}
          scrollToFirstError
        >
          <Form.Item
            initialValue={userPages.username}
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
            initialValue={userPages.email}
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
            initialValue={userPages.phoneNumber}
            label="номер телефона"
            name="phoneNumber"
            rules={[{ validator: phoneValidator }]}
          >
            <Input placeholder="+7 (999) 123-45-67" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              edit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
