import { useAppDispatch, useAppSelector } from "@/ducks/hooks";
import { getProfile } from "@/ducks/users";
import { useEffect } from "react";

export function Profile() {
  const dispatch = useAppDispatch();

  const profile = useAppSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div style={{ textAlign: "center" }}>
      <div>Имя пользователя : {profile.username}</div>
      <div>email : {profile.email}</div>
      <div>телефон : {profile.phoneNumber}</div>
    </div>
  );
}
