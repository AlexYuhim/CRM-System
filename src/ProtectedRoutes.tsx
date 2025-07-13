import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "./ducks/hooks";

interface IProtectedRoutesProps {
  isAuth?: boolean;
}

export const ProtectedRoutes = ({ isAuth }: IProtectedRoutesProps) => {
  const { authenticated } = useAppSelector((store) => store.auth);
  const location = useLocation();

  if (isAuth && !authenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!isAuth && authenticated) {
    const from = location.state?.from?.pathname || "/todos";
    return <Navigate to={from} replace />;
  }
  return <Outlet />;
};
