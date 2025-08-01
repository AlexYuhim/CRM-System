import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";
import { NavigationMenu } from "./NavigationMenu/NavigationMenu";

export function MainLayout() {
  return (
    <>
      <h1 className="tile_main">CRM-System</h1>
      <div className="main_wr">
        <Row>
          <Col flex="200px">
            <NavigationMenu />
          </Col>
          <Col flex="auto">
            <Outlet />
          </Col>
        </Row>
      </div>
    </>
  );
}
