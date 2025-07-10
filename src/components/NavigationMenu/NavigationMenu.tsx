import { Link } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { LogoutButton } from "../LogoutButton/LogoutButton";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "1", label: <Link to="/todos">список задач</Link> },
  { key: "2", label: <Link to="user/profile">личный кабинет</Link> },
  { key: "3", label: <LogoutButton /> },
];

export function NavigationMenu() {
  return <Menu defaultSelectedKeys={["1"]} items={items} />;
}
