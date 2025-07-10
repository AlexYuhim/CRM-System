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
      <div>username : {profile.username}</div>
      <div>email : {profile.email}</div>
      <div> date : {profile.date}</div>
      <div> isBlocked : {profile.isBlocked.toString()}</div>
      <div>roles : {profile.roles}</div>
      <div>phoneNumber : {profile.phoneNumber}</div>
      <div>id : {profile.id}</div>
      <h1>Приvет кому не лень!</h1>
    </div>
  );
}
