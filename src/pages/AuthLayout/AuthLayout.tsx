import { SignUpForm } from "./SignUpForm";
import { SignInForm } from "./SignInForm";
import { useAppSelector } from "@/ducks/hooks";

export function AuthLayout() {
  const { isRegistrationForm } = useAppSelector((state) => state.auth);

  return <>{isRegistrationForm ? <SignUpForm /> : <SignInForm />}</>;
}
