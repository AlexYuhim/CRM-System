import { logOut } from "@/ducks/auth";
import { useAppDispatch } from "@/ducks/hooks";
import { Navigate, useLocation } from "react-router-dom";
export function LogoutButton() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const hendleLogout = () => {
    dispatch(logOut());
    <Navigate to={"/"} />;
  };

  return <button onClick={hendleLogout}>Выйти</button>;
}
