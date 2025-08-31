import { getAllUsers } from "@/ducks/admin";
import { useAppDispatch } from "@/ducks/hooks";
import { Input, message } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

const SearchUser = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

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
          search: searchValue,
        },
      })
    );
  };

  return (
    <>
      {contextHolder}
      <Input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        style={{ width: 300 }}
        placeholder="Поиск по имени или email"
        prefix={<SearchOutlined />}
        onPressEnter={handleSearch}
      />
    </>
  );
};
export default SearchUser;
