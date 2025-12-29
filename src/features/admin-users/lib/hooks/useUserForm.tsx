import { useEffect, useState, useCallback } from "react";
import { Form } from "antd";
import { User } from "@/shared/types/types.tsx";
import { useAppDispatch } from "@/ducks/hooks.ts";

import { getFieldData } from "@/shared/utils/getFieldDeta.ts";
import { getUserPages, updateUser } from "../../model/thunk.ts";
import { UserRequest } from "@/entities/user/model/types.ts";

export const useUserForm = (userId: number, userData: User | null) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<UserRequest>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        username: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
      });
    }
  }, [userData, form]);

  const handleEditClick = useCallback((editing: boolean) => {
    setIsEditing(editing);
  }, []);

  const handleSubmit = useCallback(
    async (values: UserRequest) => {
      if (!userData) return;

      const editFields = getFieldData(userData, values);

      if (!form.isFieldsTouched()) {
        throw new Error("Внесите изменения");
      }

      await dispatch(updateUser({ userData: editFields, userId })).unwrap();
      dispatch(getUserPages(userId));

      return "Профиль пользователя успешно обновлен.";
    },
    [dispatch, form, userId, userData]
  );

  return {
    form,
    isEditing,
    handleEditClick,
    handleSubmit,
  };
};
