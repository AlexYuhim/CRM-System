import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Menu } from "antd";
import type { MenuProps } from "antd";
import { useAppDispatch, useAppSelector } from "@/ducks/hooks";
import { useEffect, useState } from "react";
import { Roles } from "@/types/types";
import { getProfile } from "@/ducks/user";

import {
  AppstoreOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { logOut } from "@/ducks/auth";

export function NavigationMenu() {
  const dispatch = useAppDispatch();
  const roles = useAppSelector((state) => state.profile.roles);
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/auth/login/");
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const admineRoles = [Roles.ADMIN, Roles.MODERATOR];
  const isAdmin = roles.some((role) => admineRoles.includes(role));

  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuItem[] = [
    {
      key: "/todos",
      icon: <UnorderedListOutlined />,
      label: <Link to="/todos">список задач</Link>,
    },
    {
      key: "/user/profile",
      icon: <UserOutlined />,
      label: <Link to="/user/profile">личный кабинет</Link>,
    },

    {
      key: "sub1",
      label: "Navigation One",
      icon: <MailOutlined />,
      children: [{ key: "5", label: "Option 5" }],
    },
    {
      key: "sub2",
      label: "Navigation Two",
      icon: <AppstoreOutlined />,
      children: [
        { key: "9", label: "Option 9" },
        {
          key: "sub3",
          label: "Submenu",
          children: [{ key: "11", label: "Option 11" }],
        },
      ],
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      style: { marginTop: "auto" },
      label: "Выход",
    },
  ];

  if (isAdmin) {
    items.unshift({
      key: "/admin/users",
      label: <Link to="/admin/users">пользователи</Link>,
      icon: <TeamOutlined />,
    });
  }
  const handlerLogout = (btn: { key: string }) => {
    if (btn.key === "logout") {
      handleLogout();
    } else {
      navigate(btn.key);
    }
  };
  return (
    <div style={{ width: "100%", maxWidth: 256 }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16, width: 80 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        selectedKeys={[location.pathname]}
        onClick={handlerLogout}
      />
    </div>
  );
}
