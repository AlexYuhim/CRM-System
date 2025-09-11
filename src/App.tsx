import "@/App.css";

import { AuthLayout } from "./pages/AuthLayout/AuthLayout";
import { MainLayout } from "./pages/MainLayout/MainLayout";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { NoFound } from "./pages/MainLayout/NoFound/NoFound";
import { TodoBoardPages } from "./pages/MainLayout/TodoBoardPages/TodoBoardPages";
import { Profile } from "./pages/MainLayout/Profile/Profile";
import { SignInForm } from "./pages/AuthLayout/SignInForm";
import { SignUpForm } from "./pages/AuthLayout/SignUpForm";
import { Users } from "./pages/MainLayout/Users/Users";
import { UserList } from "./pages/MainLayout/Users/UserList";

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
