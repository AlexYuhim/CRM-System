import { useEffect, useState, useMemo, useCallback, Key } from "react";
import { message, Table, TablePaginationConfig } from "antd";
import { useAppDispatch, useAppSelector } from "@/ducks/hooks.ts";
import { getAllUsers } from "../../model/thunk.ts";
import { clearError } from "../../model/slice.ts";
import { User } from "@/shared/types/types.tsx";

export const useUsersTable = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const errorStore = useAppSelector((store) => store.admin.error);
  const allUsers = useAppSelector((store) => store.admin.allUser);
  const userFilters = useAppSelector((store) => store.admin.userFilters);
  const totalAmount = useAppSelector(
    (store) => store.admin.userFilters.totalAmount
  );

  useEffect(() => {
    dispatch(getAllUsers({ params: userFilters }));
  }, [dispatch, userFilters]);

  useEffect(() => {
    if (errorStore) {
      messageApi.error(errorStore);
      dispatch(clearError());
    }
  }, [errorStore, messageApi, dispatch]);

  const onSelectChange = useCallback((newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const rowSelection = useMemo(
    () => ({
      onChange: onSelectChange,
      selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
    }),
    [onSelectChange]
  );

  const paginationConfig = useMemo(
    () => ({
      defaultPageSize: 20,
      pageSizeOptions: ["20", "30", "50"],
      showSizeChanger: true,
      hideOnSinglePage: true,
      total: totalAmount,
    }),
    [totalAmount]
  );

  const handleTableChange = useCallback(
    (paginationObj: TablePaginationConfig) => {
      dispatch(
        getAllUsers({
          params: {
            ...userFilters,
            limit: paginationObj.pageSize ?? 20,
            page: (paginationObj.current ?? 1) - 1,
          },
        })
      );
    },
    [dispatch, userFilters]
  );

  const dataSource = useMemo(
    () => allUsers.map((user: User) => ({ ...user })),
    [allUsers]
  );

  return {
    dataSource,
    rowSelection,
    paginationConfig,
    handleTableChange,
    contextHolder,
  };
};
