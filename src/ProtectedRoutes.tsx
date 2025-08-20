import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "./ducks/hooks";

export const ProtectedRoutes = () => {
  const { authenticated } = useAppSelector((store) => store.auth);
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
