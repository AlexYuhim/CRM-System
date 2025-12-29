import { useUserEdit } from "@/features/admin-users/lib/hooks/useUserEdit.tsx";
import { UserEditForm } from "@/features/admin-users/ui/UserEditForm.tsx";

import { Space } from "antd";

interface UserEditWidgetProps {
  userId: number;
}

export const UserEditWidget = ({ userId }: UserEditWidgetProps) => {
  const { handleBack, contextHolder } = useUserEdit(userId);

  return (
    <>
      {contextHolder}
      <Space>
        <button style={{ width: "200px" }} onClick={handleBack}>
          назад
        </button>
      </Space>
      <br />
      <br />
      <UserEditForm userId={userId} />
    </>
  );
};
