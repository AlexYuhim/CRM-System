import { useState } from "react";
import { SignUpForm } from "./SignUpForm";
import { SignInForm } from "./SignInForm";

export function AuthLayout() {
  const [isRegister, setisRegister] = useState(false);

  const toggleAuthMode = () => setisRegister(!isRegister);
  return (
    <>
      {isRegister ? (
        <SignUpForm onToggleForm={toggleAuthMode} />
      ) : (
        <SignInForm onToggleForm={toggleAuthMode} />
      )}
    </>
  );
}
