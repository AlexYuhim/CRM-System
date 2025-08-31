import {
  blockedUser,
  deleteUser,
  getAllUsers,
  unBlockedUser,
} from "@/ducks/admin";
import { useAppDispatch, useAppSelector } from "@/ducks/hooks";
import { Roles, User } from "@/types/types";
import {
  Button,
  Divider,
  Dropdown,
  MenuProps,
  message,
  Popconfirm,
  Space,
  TableColumnsType,
  Tag,
} from "antd";
import { DownOutlined, RightOutlined } from "@ant-design/icons";

import RolesEdit from "./RolesEdit";
import { useNavigate } from "react-router-dom";
import { MessageInstance } from "antd/es/message/interface";

const itemsMenuSort: MenuProps["items"] = [
  { key: "ASC", label: "По возрастанию" },
  { key: "DESC", label: "По убыванию" },
  { key: "none", label: "Сбросить сортировку" },
];

const roleColors: Record<string, string> = {
  ADMIN: "#4976F4",
  MODERATOR: "#D28E3D",
  USER: "#954BAF",
};

export const UserTableColumns = () => {
  const dispatch = useAppDispatch();
  const userFilters = useAppSelector((store) => store.admin.userFilters);
  const profile = useAppSelector((store) => store.profile.roles);
  const allUsers = useAppSelector((store) => store.admin.allUser);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  async function handleUnBlocked(id: number) {
    try {
      await dispatch(unBlockedUser(id)).unwrap();
      dispatch(
        getAllUsers({
          params: {
            ...userFilters,
          },
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handleBlocked(id: number) {
    try {
      await dispatch(blockedUser(id)).unwrap();
      dispatch(
        getAllUsers({
          params: {
            ...userFilters,
          },
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handleDeleteUser(id: number, messageApi?: MessageInstance) {
    try {
      await dispatch(deleteUser(id)).unwrap();
      messageApi?.open({
        type: "success",
        content: "Пользователь успешно удален.",
      });
      await dispatch(
        getAllUsers({
          params: {
            ...userFilters,
          },
        })
      ).unwrap();
    } catch (error) {
      messageApi?.open({
        type: "error",
        content: `${error}`,
      });
    }
  }

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

  const columns: TableColumnsType<User> = [
    {
      title: (
        <Space
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            gap: 30,
          }}
        >
          Имя
          <Dropdown
            menu={{ items: itemsMenuSort, onClick: handleSort("username") }}
            trigger={["click"]}
          >
            <a
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              сортировать
              <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
      dataIndex: "username",
    },
    {
      title: (
        <Space
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",

            gap: 30,
          }}
        >
          Email
          <Dropdown
            menu={{ items: itemsMenuSort, onClick: handleSort("email") }}
            trigger={["click"]}
          >
            <a
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              сортировать
              <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
      dataIndex: "email",
    },
    {
      title: "Телефон",
      dataIndex: "phoneNumber",
    },
    {
      title: "Роли",
      dataIndex: "roles",
      key: "roles",
      width: 500,
      render: (roles: Roles[], record: User) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <Space>
            {roles.map((role) => (
              <Tag color={roleColors[role] || "default"} key={role}>
                {role}
              </Tag>
            ))}
          </Space>
          {profile.includes(Roles.ADMIN) ? (
            <RolesEdit
              roles={roles}
              record={record}
              userFilters={userFilters}
            />
          ) : (
            ""
          )}
        </div>
      ),
    },

    {
      title: "Дата регистр",
      dataIndex: "date",
    },

    {
      title: "Блокировка",
      dataIndex: "isBlocked",
      align: "center",
      render: (isBlocked: boolean) => <Tag>{isBlocked ? "+" : "-"}</Tag>,
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, record: User) => {
        return (
          <Popconfirm
            title={
              <div style={{ maxWidth: 200 }}>
                <div style={{ marginBottom: 8 }}>
                  {record.isBlocked
                    ? ` разблокировать пользователя: ${record.username}?`
                    : ` Блокируем пользователя: ${record.username}?`}
                </div>
                <Divider style={{ margin: "8px 0" }} />
              </div>
            }
            onConfirm={() => {
              record.isBlocked
                ? handleUnBlocked(record.id)
                : handleBlocked(record.id);
            }}
            okText="OK"
            cancelText="Отмена"
            placement="bottom"
            icon={null}
          >
            <Button
              disabled={!!(!profile.includes(Roles.ADMIN) && record.isBlocked)}
            >
              {record.isBlocked ? "разблокировать" : "блокировать"}
            </Button>
          </Popconfirm>
        );
      },
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => navigate(`/admin/users/${record.id}`)}
        >
          в профиль
          <RightOutlined />
        </Button>
      ),
    },

    {
      title: "",
      key: "actions",
      render: (_, record) => {
        if (allUsers.length >= 1 && profile.includes(Roles.ADMIN)) {
          return (
            <Popconfirm
              title={`Удалить пользователя : ${record.username} ? `}
              onConfirm={() => handleDeleteUser(record.id)}
            >
              <a style={{ color: "red" }}>Delete</a>
            </Popconfirm>
          );
        }
      },
    },
  ];
  {
    contextHolder;
  }
  return columns;
};
