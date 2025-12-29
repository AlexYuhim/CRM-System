import { Input, message } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import useDebounce from "@/shared/hooks/useDebounce.ts";
import { useAppDispatch } from "@/ducks/hooks.ts";
import { getAllUsers } from "@/features/admin-users/model/thunk.ts";

const SearchUser = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>("");

  useDebounce(
    () => {
      dispatch(
        getAllUsers({
          params: {
            search: searchValue,
          },
        })
      );
    },
    500,
    [searchValue]
  );

  return (
    <>
      {contextHolder}
      <Input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        style={{ width: 300 }}
        placeholder="Поиск по имени или email"
        prefix={<SearchOutlined />}
      />
    </>
  );
};
export default SearchUser;
