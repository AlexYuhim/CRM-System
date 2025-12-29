import { useAppSelector } from "@/ducks/hooks.ts";

import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";
import { Spiner } from "@shared/ui/spiner/index.tsx";
import { NavigationMenu } from "@/widgets/nawigation-menu/ui/index.tsx";

export function MainLayout() {
  const { isLoading } = useAppSelector((store) => store.auth);

  if (isLoading) {
    return (
      <div className="appSpiner">
        <Spiner />
      </div>
    );
  }

  return (
    <>
      <h1 className="tile_main">CRM-System</h1>
      <div className="main_wr">
        <Row style={{ flexWrap: "nowrap", gap: 20 }}>
          <Col flex="0 0 auto">
            <NavigationMenu />
          </Col>
          <Col flex="1 1 auto">
            <Outlet />
          </Col>
        </Row>
      </div>
    </>
  );
}
