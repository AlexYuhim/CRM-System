import "@/App.css";
import { TodoBoardPages } from "@/pages/TodoBoardPages/TodoBoardPages";
import { Route, Routes } from "react-router-dom";
import { Profile } from "./pages/Profile/Profile";
import { NavigationMenu } from "./components/NavigationMenu/NavigationMenu";
import { NoFound } from "./pages/NoFound/NoFound";
import { Col, Row } from "antd";
import { AuthLayout } from "./components/Auth/AuthLayout";

function App() {
  return (
    <>
      <AuthLayout />
      <h1 className="tile_main">CRM-System</h1>
      <div className="main_wr">
        <Row>
          <Col flex="200px">
            <NavigationMenu />
          </Col>
          <Col flex="auto">
            <Routes>
              <Route path="/" element={<TodoBoardPages />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NoFound />} />
            </Routes>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default App;
