import { Route, Routes } from "react-router-dom";

import { SignInForm } from "@/widgets/auth-layout/ui/SignInForm.tsx";
import { SignUpForm } from "@/widgets/auth-layout/ui/SignUpForm.tsx";

import { TodoBoardPages } from "@/pages/TodoBoardPages/TodoBoardPages.tsx";
import { Profile } from "@/pages/Profile/Profile.tsx";
import { NoFound } from "@/pages/NoFound/NoFound.tsx";
import { MainLayout } from "@/app/main-layout/index.tsx";

import { AuthLayout } from "@app/auth-layout/index.tsx";
import { ProtectedRoutes } from "@/features/auth/ProtectedRoutes.tsx";
import { UsersPage } from "@/pages/users/ui/UsersPage.tsx";

import { UserEditPages } from "@/pages/users/ui/UserEditPages.tsx";

export const Router = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/users/:id" element={<UserEditPages />} />
            <Route path="/todos" element={<TodoBoardPages />} />
            <Route path="/user/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<SignInForm />} />
          <Route path="/auth/register" element={<SignUpForm />} />
        </Route>
        <Route path="*" element={<NoFound />} />
      </Routes>
    </div>
  );
};
