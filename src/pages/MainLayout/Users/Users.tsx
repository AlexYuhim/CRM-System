import { getAllUsers } from "@/ducks/admin";
import { useAppDispatch, useAppSelector } from "@/ducks/hooks";
import { useEffect } from "react";
import { useState } from "react";
import { message, Table, Space, Divider, Row, Col } from "antd";

import type { TableProps } from "antd";
import { User } from "@/types/types";
import type { Key } from "antd/es/table/interface";

import type { TablePaginationConfig } from "antd/lib/table/interface";

import { clearError } from "@/ducks/admin/slice";

import SearchUser from "./components/SearchUser";
import { FilterUser } from "./components/FilterUser";
import { UserTableColumns } from "./components/UserTableColumns";

export function Users() {
  const dispatch = useAppDispatch();
  const errorStore = useAppSelector((store) => store.admin.error);
  const allUsers = useAppSelector((store) => store.admin.allUser);
  const userFilters = useAppSelector((store) => store.admin.userFilters);
  const totalAmount = useAppSelector(
    (store) => store.admin.userFilters.totalAmount
  );
  const columns = UserTableColumns();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    dispatch(
      getAllUsers({
        params: {
          ...userFilters,
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (errorStore) {
      messageApi.open({
        type: "error",
        content: `${errorStore}`,
      });
      dispatch(clearError());
    }
  }, [errorStore, messageApi]);

  const dataSource = allUsers.map<User>((user) => ({
    ...user,
  }));

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  type TableRowSelection<T extends object = object> =
    TableProps<T>["rowSelection"];
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
  const handleTableChange = (paginationObj: TablePaginationConfig) => {
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

  return (
    <>
      {contextHolder}
      <Divider orientation="left">Пользователи</Divider>
      <Row justify={"end"} style={{ marginBottom: 16, gap: 80 }}>
        <Col>
          <Space>
            <SearchUser />
            <FilterUser />
          </Space>
        </Col>
      </Row>
      <Table<User>
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={poginationConfig}
        onChange={handleTableChange}
      />
    </>
  );
}
