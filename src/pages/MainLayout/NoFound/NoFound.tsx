import { useAppSelector } from "@/ducks/hooks";
import { Link, Navigate, useLocation } from "react-router-dom";

export const NoFound = () => {
  const { authenticated } = useAppSelector((store) => store.auth);
  const location = useLocation();

  if (!authenticated) {
    return (
      <>
        <h2>404 попробуйте войти</h2>
        <div>
          <Link to="/auth/login"> Go Login</Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h2>404 такой страници нет </h2>
        <div>
          <Link to="/todos"> Go Todos</Link>
        </div>
      </>
    );
  }
};
