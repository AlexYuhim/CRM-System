import "@/App.css";

import { AuthLayout } from "./pages/AuthLayout/AuthLayout";
import { MainLayout } from "./pages/MainLayout/MainLayout";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { NoFound } from "./pages/MainLayout/NoFound/NoFound";
import { TodoBoardPages } from "./pages/MainLayout/TodoBoardPages/TodoBoardPages";
import { Profile } from "./pages/MainLayout/Profile/Profile";
import { useEffect, useState } from "react";
import { refreshToken } from "./ducks/auth";
import { useAppDispatch, useAppSelector } from "./ducks/hooks";
import { Spiner } from "./components/Spiner/Spiner";
import { SignInForm } from "./pages/AuthLayout/SignInForm";
import { SignUpForm } from "./pages/AuthLayout/SignUpForm";

function App() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.auth);
  // const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  useEffect(() => {
    dispatch(refreshToken()).unwrap();
    // .finally(() => setIsCheckingAuth(false));
  }, [dispatch]);

  // if (isLoading || isCheckingAuth) {
  //   return (
  //     <div className="appSpiner">
  //       <Spiner />
  //     </div>
  //   );
  // }

  return (
    <div className="App">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<SignInForm />} />
          <Route path="/auth/register" element={<SignUpForm />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route path="/todos" element={<TodoBoardPages />} />
            <Route path="user/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="*" element={<NoFound />} />
      </Routes>
    </div>
  );
}

export default App;
