import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "./ducks/hooks";

interface IProtectedRoutesProps {
  isAuth?: boolean;
}

export const ProtectedRoutes = ({ isAuth }: IProtectedRoutesProps) => {
  const { authenticated } = useAppSelector((store) => store.auth);
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
