import { Button, Dropdown, MenuProps } from "antd";

import { FilterOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/ducks/hooks.ts";
import { getAllUsers } from "../model/thunk.ts";
import { Roles } from "@/entities/user/model/types.ts";

const itemsMenuFilterProps: MenuProps["items"] = [
  { label: "все пользователи", key: "" },
  { label: "заблокированные пользователи", key: "true" },
  { label: "активные пользователи", key: "false" },
];
export const UserFilters = () => {
  const profile = useAppSelector((state) => state.profile.roles);
  const userFilters = useAppSelector((store) => store.admin.userFilters);
  const dispatch = useAppDispatch();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    dispatch(
      getAllUsers({
        params: {
          ...userFilters,
          isBlocked: e.key,
        },
      })
    );
  };
  const menuFilterProps = {
    items: itemsMenuFilterProps,
    onClick: handleMenuClick,
  };
  return (
    <>
      {profile.includes(Roles.ADMIN) ? (
        <Dropdown menu={menuFilterProps}>
          <Button icon={<FilterOutlined />}>Filter</Button>
        </Dropdown>
      ) : (
        ""
      )}
    </>
  );
};
