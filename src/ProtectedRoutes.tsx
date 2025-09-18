import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./ducks/hooks";
import { useEffect } from "react";
import { refreshToken } from "./ducks/auth";

export const ProtectedRoutes = () => {
  const dispatch = useAppDispatch();

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
