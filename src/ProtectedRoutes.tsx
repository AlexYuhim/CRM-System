import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useEffect } from "react";
import { refreshToken } from "./features/auth/index.ts";
import { useAppDispatch, useAppSelector } from "./ducks/hooks.ts";

export const ProtectedRoutes = () => {
  const dispatch = useAppDispatch();
  refreshToken;
  useEffect(() => {
    dispatch(refreshToken()).unwrap();
  }, [dispatch]);

  const { authenticated } = useAppSelector((store) => store.auth);
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
