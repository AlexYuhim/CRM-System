import { getAllUsers } from "@/ducks/admin";
import { useAppDispatch } from "@/ducks/hooks";
import { UserFilters } from "@/types/types";
import { MenuProps } from "antd";
import { useEffect, useState } from "react";

const itemsMenuSort: MenuProps["items"] = [
  { key: "ASC", label: "По возрастанию" },
  { key: "DESC", label: "По убыванию" },
  { key: "none", label: "Сбросить сортировку" },
];

interface SearchUserProp {
  userFilters: UserFilters;
}

export const SearchUser: React.FC<SearchUserProp> = ({ userFilters }) => {
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    dispatch(
      getAllUsers({
        params: {
          ...userFilters,
        },
      })
    );
  }, [dispatch]);

  return null;
};
