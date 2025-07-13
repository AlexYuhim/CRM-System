import { SignUpForm } from "./SignUpForm";
import { SignInForm } from "./SignInForm";
import { useAppDispatch, useAppSelector } from "@/ducks/hooks";
import formBg from "@/assets/images/bgForm.webp";
import logo from "@/assets/images/ava.webp";
import { Button } from "antd";
import { clearError, toggleForm } from "@/ducks/auth/slice";
import style from "./AuthLayout.module.css";

export function AuthLayout() {
  const { isRegistrationForm } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const switchForm = (isRegForm: boolean) => {
    dispatch(clearError());
    dispatch(toggleForm(isRegForm));
  };

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
            <div className={style.titleText}>
              {isRegistrationForm ? (
                <div>
                  <h3>Зарегистрируйте свою учетную запись</h3>
                  <h5>Начните следить, что происходит с вашим бизнесом</h5>
                </div>
              ) : (
                <div>
                  <h3>Войдите в свою учетную запись</h3>
                  <h5>Посмотрите, что происходит с вашим бизнесом</h5>
                </div>
              )}
            </div>
            {isRegistrationForm ? <SignUpForm /> : <SignInForm />}
          </div>
          <div className={style.linkSwitchForm}>
            {isRegistrationForm ? (
              <Button onClick={() => switchForm(false)}>Авторизация</Button>
            ) : (
              <Button onClick={() => switchForm(true)}>Регистрация</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
