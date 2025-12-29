import { UserEditWidget } from "@/widgets/user-edit/ui/UserEditWidget.tsx";
import { useParams } from "react-router-dom";

export const UserEditPages = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  if (!id) return <div>Пользователь не найден</div>;

  return <UserEditWidget userId={userId} />;
};
