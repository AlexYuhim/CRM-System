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
  Divider,
  Row,
  Col,
  Input,
  Select,
  Checkbox,
} from "antd";

import type {
  MenuProps,
  TableColumnsType,
  TableProps,
  SelectProps,
} from "antd";
import { Roles, User } from "@/types/types";
import type { Key } from "antd/es/table/interface";
import {
  RightOutlined,
  DownOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { TablePaginationConfig } from "antd/lib/table/interface";
import { clearError } from "@/ducks/admin/slice";

export function Users() {
  const dispatch = useAppDispatch();
  const errorStore = useAppSelector((store) => store.admin.error);
  const allUsers = useAppSelector((store) => store.admin.allUser);
  const userFilters = useAppSelector((store) => store.admin.userFilters);
  const totalAmount = useAppSelector(
    (store) => store.admin.userFilters.totalAmount
  );
  const profile = useAppSelector((state) => state.profile);
  console.log("profile", profile.roles);

  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    dispatch(
      getAllUsers({
        params: {
          ...userFilters,
        },
      })
    );
  }, [dispatch]);

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  async function handleUnBlocked(id: number) {
    try {
      await dispatch(unBlocedkUser(id)).unwrap();
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
      await dispatch(blocedkUser(id)).unwrap();
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

  console.log("userFilters", userFilters);
  async function handleDeleteUser(id: number) {
    try {
      await dispatch(deleteUser(id)).unwrap();
      messageApi.open({
        type: "success",
        content: "Пользователь успешно удален.",
      });
      const resultAction = await dispatch(
        getAllUsers({
          params: {
            ...userFilters,
          },
        })
      ).unwrap();
      console.log("resultAction", resultAction);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: `${error}`,
      });
    }
  }
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
          ...userFilters,
          search: searchValue,
        },
      })
    );
  };
  useEffect(() => {
    if (errorStore) {
      messageApi.open({
        type: "error",
        content: `${errorStore}`,
      });
      dispatch(clearError());
    }
  }, [errorStore, messageApi]);

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

  const roleColors: Record<string, string> = {
    ADMIN: "#4976F4",
    MODERATOR: "#D28E3D",
    USER: "#954BAF",
  };
  const itemsMenuSort: MenuProps["items"] = [
    { key: "ASC", label: "По возрастанию" },
    { key: "DESC", label: "По убыванию" },
    { key: "none", label: "Сбросить сортировку" },
  ];

  interface UserRoleSelectorProps {
    selectedRoles: Roles[];
    onChange: (roles: Roles[]) => void;
  }

  const rolesOptions: SelectProps["options"] = [
    { label: "Админ", value: "admin" },
    { label: "Пользователь", value: "user" },
    { label: "Гость", value: "guest" },
    { label: "Модератор", value: "moderator" },
  ];

  const UserRoleSelector: React.FC<UserRoleSelectorProps> = ({
    selectedRoles,
    onChange,
  }) => (
    <Select
      mode="multiple"
      placeholder=""
      onChange={onChange}
      style={{ minWidth: 50 }}
      options={rolesOptions}
      allowClear
    />
  );

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
            menu={{ items: itemsMenuSort, onClick: handleSort("username") }}
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
            menu={{ items: itemsMenuSort, onClick: handleSort("email") }}
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
      key: "roles",
      width: 500,
      render: (roles: Roles[], record) => {
        return (
          <Space
            wrap
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <div>
              {roles.map((role) => (
                <Tag color={roleColors[role] || "default"} key={role}>
                  {role}
                </Tag>
              ))}
            </div>
            <button>ghbdftn</button>
          </Space>
        );
      },
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
        console.log("profile.roles", !profile.roles.includes(Roles.ADMIN));
        return (
          <Button
            disabled={!profile.roles.includes(Roles.ADMIN)}
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
    pageSizeOptions: ["20", "30", "50"],
    showSizeChanger: true,
    hideOnSinglePage: true,
    total: totalAmount,
  };
  const handleTablrChange = (paginationObj: TablePaginationConfig) => {
    dispatch(
      getAllUsers({
        params: {
          ...userFilters,
          limit: paginationObj.pageSize ?? 20,
          offset: (paginationObj.current ?? 1) - 1,
        },
      })
    );
  };
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

  const itemsMenuFilterProps: MenuProps["items"] = [
    { label: "все пользователи", key: "" },
    { label: "заблокированные пользователи", key: "true" },
    { label: "активные пользователи", key: "false" },
  ];
  const menuFilterProps = {
    items: itemsMenuFilterProps,
    onClick: handleMenuClick,
  };
  return (
    <>
      {contextHolder}
      <Divider orientation="left">Пользователи</Divider>
      <Row justify={"end"} style={{ marginBottom: 16, gap: 80 }}>
        <Col>
          <Space>
            <Input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              style={{ width: 300 }}
              placeholder="Поиск по имени или email"
              prefix={<SearchOutlined />}
              onPressEnter={handleSearch}
            />
            <Dropdown menu={menuFilterProps}>
              <Button icon={<FilterOutlined />}>Filter</Button>
            </Dropdown>
          </Space>
        </Col>
      </Row>
      <Table<User>
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={poginationConfig}
        onChange={handleTablrChange}
      />
    </>
  );
}
