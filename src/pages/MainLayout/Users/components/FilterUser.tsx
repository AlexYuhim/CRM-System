import { getAllUsers } from "@/ducks/admin";
import { useAppDispatch, useAppSelector } from "@/ducks/hooks";
import { Roles } from "@/types/types";
import { Button, Dropdown } from "antd";
import { MenuProps } from "antd/lib";
import { FilterOutlined } from "@ant-design/icons";

const itemsMenuFilterProps: MenuProps["items"] = [
  { label: "все пользователи", key: "" },
  { label: "заблокированные пользователи", key: "true" },
  { label: "активные пользователи", key: "false" },
];
export const FilterUser = () => {
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
