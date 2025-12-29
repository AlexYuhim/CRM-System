import formBg from "@/assets/images/bgForm.webp";
import logo from "@/assets/images/ava.webp";
import style from "@/widgets/auth-layout/ui/AuthLayout.module.css";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className={style.authPagesFx}>
      <div className={style.authPages}>
        <div className={style.formImg}>
          <img src={formBg} alt="задний фон формы" />
        </div>
        <div className={style.formWr}>
          <div className={style.title}>
            <div className={style.logo}>
              <img src={logo} alt="типо логотип" />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
