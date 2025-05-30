import { Link } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "1", label: <Link to="/">список задач</Link> },
  { key: "2", label: <Link to="/profile">профиль</Link> },
];

export function NavigationMenu() {
  return <Menu defaultSelectedKeys={["1"]} items={items} />;
}
