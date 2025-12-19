import "@/App.css";

import { MainLayout } from "./pages/MainLayout/MainLayout.tsx";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes.tsx";
import { NoFound } from "./pages/MainLayout/NoFound/NoFound.tsx";
import { TodoBoardPages } from "./pages/MainLayout/TodoBoardPages/TodoBoardPages.tsx";
import { Profile } from "./pages/MainLayout/Profile/Profile.tsx";

import { Users } from "./pages/MainLayout/Users/Users.tsx";
import { UserList } from "./pages/MainLayout/Users/UserList.tsx";
import { AuthLayout } from "./widgets/auth-layout/ui/AuthLayout.tsx";
import { SignInForm } from "./widgets/auth-layout/ui/SignInForm.tsx";
import { SignUpForm } from "./widgets/auth-layout/ui/SignUpForm.tsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/users/:id" element={<UserList />} />
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
}

export default App;
