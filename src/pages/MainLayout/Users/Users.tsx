import {
  blocedkUser,
  deleteUser,
  getAllUsers,
  unBlocedkUser,
} from "@/ducks/admin";
import { useAppDispatch, useAppSelector } from "@/ducks/hooks";
import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  message,
  Table,
  Tag,
  Popconfirm,
  Dropdown,
  Space,
  Menu,
} from "antd";
import type { MenuProps, TableColumnsType, TableProps } from "antd";
import { User } from "@/types/types";
import type { Key } from "antd/es/table/interface";
import { RightOutlined, DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export function Users() {
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector((store) => store.admin.allUser);
  const totalAmount = useAppSelector(
    (store) => store.admin.paginationData.totalAmount
  );
  console.log("totalAmount", totalAmount);

  useEffect(() => {
    dispatch(getAllUsers({}));
  }, [dispatch]);

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  async function handleUnBlocked(id: number) {
    try {
      await dispatch(unBlocedkUser(id)).unwrap();
      dispatch(getAllUsers({}));
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handleBlocked(id: number) {
    try {
      await dispatch(blocedkUser(id)).unwrap();
      dispatch(getAllUsers({}));
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handleDeleteUser(id: number) {
    try {
      await dispatch(deleteUser(id)).unwrap();

      messageApi.open({
        type: "success",
        content: "Пользователь успешно удален.",
      });
      dispatch(getAllUsers({}));
    } catch (error) {
      messageApi.open({
        type: "error",
        content: `${error}`,
      });
    }
  }

  const handleSort =
    (dataIndex: string): MenuProps["onClick"] =>
    ({ key }) => {
      if (key === "none") {
        dispatch(getAllUsers({ params: {} }));
        return;
      }
      if (typeof key === "string") {
        console.log("key", key);
        console.log("dataIndex", dataIndex);
        dispatch(
          getAllUsers({ params: { sortBy: dataIndex, sortOrder: key } })
        );
      } else {
      }
    };

  const items: MenuProps["items"] = [
    { key: "ASC", label: "По возрастанию" },
    { key: "DESC", label: "По убыванию" },
    { key: "none", label: "Сбросить сортировку" },
  ];

  type TableRowSelection<T extends object = object> =
    TableProps<T>["rowSelection"];

  const columns: TableColumnsType<User> = [
    {
      title: (
        <Space
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          Имя
          <Dropdown
            menu={{ items, onClick: handleSort("username") }}
            trigger={["click"]}
          >
            <a>
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
          }}
        >
          Email
          <Dropdown
            menu={{ items, onClick: handleSort("email") }}
            trigger={["click"]}
          >
            <a>
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
    },
    {
      title: "Блокировка",
      dataIndex: "isBlocked",
      render: (isBlocked: boolean) => <Tag>{isBlocked ? "+" : "-"}</Tag>,
    },
    {
      title: "Дата регистр",
      dataIndex: "date",
    },

    {
      title: "Действия",
      key: "actions",
      render: (_, record: User) => {
        return (
          <Button
            onClick={() =>
              record.isBlocked
                ? handleUnBlocked(record.id)
                : handleBlocked(record.id)
            }
          >
            {record.isBlocked ? "разблокировать" : "блокировать"}
          </Button>
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
      render: (_, record) =>
        allUsers.length >= 1 ? (
          <Popconfirm
            title={`Удалить пользователя : ${record.username} ? `}
            onConfirm={() => handleDeleteUser(record.id)}
          >
            <a style={{ color: "red" }}>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const dataSource = allUsers.map<User>((user) => ({
    ...user,
  }));

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<User> = {
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
  };
  const poginationConfig = {
    defaultPageSize: 20,
    pageSizeOptions: ["10", "20", "30", "50", "100"],
    showSizeChanger: true,
    hideOnSinglePage: true,
  };

  return (
    <>
      {contextHolder}
      <Table<User>
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={poginationConfig}
      />
    </>
  );
}
