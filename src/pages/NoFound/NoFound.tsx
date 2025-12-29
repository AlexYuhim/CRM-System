import { useAppSelector } from "@/ducks/hooks";
import { Link } from "react-router-dom";
import { Result } from "antd";

export const NoFound = () => {
  const { authenticated } = useAppSelector((store) => store.auth);

  if (!authenticated) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="что то пошло не так"
        extra={
          <Link to="/auth/login" type="primary">
            LogIn
          </Link>
        }
      />
    );
  } else {
    return (
      <Result
        status="404"
        title="404"
        subTitle="404 такой страници нет"
        extra={
          <Link to="/todos" type="primary">
            Home
          </Link>
        }
      />
    );
  }
};
