import { useCallback } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/ducks/hooks.ts";
import { User } from "@/shared/types/types.tsx";

export const useUserEdit = (userId: number) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const user = useAppSelector((state) => state.admin.user) as User;

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    user,
    contextHolder,
    handleBack,
    messageApi,
  };
};
