import SearchUser from "@/features/admin-users/ui/SearchUser.tsx";
import { UserFilters } from "@/features/admin-users/ui/UserFilters.tsx";
import { UsersTableContent } from "@/features/admin-users/ui/UsersTableContent.tsx";
import { Divider, Row, Col, Space } from "antd";

export const UsersTableWidget = () => {
  return (
    <>
      <Divider orientation="left">Пользователи</Divider>
      <Row justify="end" style={{ marginBottom: 16, gap: 80 }}>
        <Col>
          <Space>
            <SearchUser />
            <UserFilters />
          </Space>
        </Col>
      </Row>
      <UsersTableContent />
    </>
  );
};
