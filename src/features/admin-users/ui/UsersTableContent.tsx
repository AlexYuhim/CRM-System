// features/admin-users/ui/UsersTableContent.tsx
import { Table } from "antd";
import { useUsersTable } from "../lib/hooks/useUsersTable.tsx";
import { UserTableColumns } from "@/features/admin-users/ui/UserTableColumns.tsx";
import { User } from "@/entities/user/model/types.ts";

export const UsersTableContent = () => {
  const {
    dataSource,
    rowSelection,
    paginationConfig,
    handleTableChange,
    contextHolder,
  } = useUsersTable();

  const columns = UserTableColumns();

  return (
    <>
      {contextHolder}
      <Table<User>
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={paginationConfig}
        onChange={handleTableChange}
      />
    </>
  );
};
