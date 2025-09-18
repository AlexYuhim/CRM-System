import React, { useState } from "react";

import { Roles, User, UserFilters } from "@/types/types";
import { Checkbox, CheckboxOptionType, Divider, Popconfirm } from "antd";
import { useAppDispatch } from "@/ducks/hooks";
import { getAllUsers, updateRolesUser } from "@/ducks/admin";

interface RelesCellProps {
  roles: Roles[];
  record: User;
  userFilters: UserFilters;
}
const rolesOptions: CheckboxOptionType[] = [
  { label: "Админ", value: Roles.ADMIN },
  { label: "Пользователь", value: Roles.USER },
  { label: "Модератор", value: Roles.MODERATOR },
];

const RolesEdit: React.FC<RelesCellProps> = ({
  roles,
  record,
  userFilters,
}) => {
  const dispatch = useAppDispatch();
  const [selectedRoles, setSelectedRoles] = useState<Roles[]>(roles);
  const handleRoleChange = (checkedValues: Roles[]) => {
    if (checkedValues.length === 0) {
      setSelectedRoles([Roles.USER]);
    } else {
      setSelectedRoles(checkedValues);
    }
  };
  const handleConfirm = (record: User, selectedRoles: Roles[]) => {
    dispatch(
      updateRolesUser({ userData: { roles: selectedRoles }, userId: record.id })
    )
      .unwrap()
      .then(() => {
        dispatch(getAllUsers({ params: { ...userFilters } }));
      });
  };

  return (
    <Popconfirm
      title={
        <div style={{ maxWidth: 200 }}>
          <div style={{ marginBottom: 8 }}>
            Редактируем роли у: {record.username}
          </div>
          <Divider style={{ margin: "8px 0" }} />
          <Checkbox.Group
            options={rolesOptions}
            value={selectedRoles}
            onChange={handleRoleChange}
          />
        </div>
      }
      onConfirm={() => handleConfirm(record, selectedRoles)}
      onCancel={() => setSelectedRoles(roles)}
      okText="Сохранить"
      cancelText="Отмена"
      placement="bottom"
      icon={null}
    >
      <a style={{ color: "green", cursor: "pointer" }}>Роли</a>
    </Popconfirm>
  );
};

export default RolesEdit;
