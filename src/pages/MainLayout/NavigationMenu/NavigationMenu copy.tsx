import { Link } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { LogoutButton } from "@/components/LogoutButton/LogoutButton";
import { useAppDispatch, useAppSelector } from "@/ducks/hooks";
import { useEffect } from "react";
import { Roles } from "@/types/types";
import { getProfile } from "@/ducks/user";

export function NavigationMenu() {
  const dispatch = useAppDispatch();
  const roles = useAppSelector((state) => state.profile.roles);
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const isAdmin =
    roles.includes(Roles.ADMIN) || roles.includes(Roles.MODERATOR);

  type MenuItem = Required<MenuProps>["items"][number];
  const items: MenuItem[] = [
    { key: "1", label: <Link to="/todos">список задач</Link> },
    { key: "2", label: <Link to="user/profile">личный кабинет</Link> },
    { key: "3", label: <LogoutButton /> },
  ];
  if (isAdmin) {
    items.push({
      key: "4",
      label: <Link to="admin/users">пользователи</Link>,
    });
  }

  return <Menu defaultSelectedKeys={["1"]} items={items} />;
}
