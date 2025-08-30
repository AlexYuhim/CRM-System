import { getAllUsers } from "@/ducks/admin";
import { useAppDispatch, useAppSelector } from "@/ducks/hooks";
import { MenuProps, message } from "antd";
import { useState } from "react";

export const useHandleres = () => {
  const dispatch = useAppDispatch();
  const userFilters = useAppSelector((store) => store.admin.userFilters);
  const [searchValue, setSearchValue] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const handleSort =
    (dataIndex: string): MenuProps["onClick"] =>
    ({ key }) => {
      if (key === "none") {
        dispatch(
          getAllUsers({
            params: { ...userFilters, sortBy: "", sortOrder: "" },
          })
        );
        return;
      }
      if (typeof key === "string") {
        dispatch(
          getAllUsers({
            params: { ...userFilters, sortBy: dataIndex, sortOrder: key },
          })
        );
      }
    };

  const handleSearch = (): void => {
    if (!searchValue.trim()) {
      messageApi.open({
        type: "warning",
        content: "введите текст для поиска",
      });

      return;
    }
    dispatch(
      getAllUsers({
        params: {
          ...userFilters,
          search: searchValue,
        },
      })
    );
  };

  return {
    handleSort,
    handleSearch,
  };
};
