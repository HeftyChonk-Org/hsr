import {
  useState,
  useEffect,
  useContext,
  FormEvent,
  useCallback,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "@/features/authentication/components/InputField/InputField";
import { LoginFormProps } from "@/features/authentication/interface";
import { useLoginContext } from "@/components/Header/Header";
import { LoginProblems } from "@/features/authentication/components/Login/LoginProblems";

export function LoginForm(props: LoginFormProps) {
  // const navigate = useNavigate();
  const [showLoginProblemsModal, setShowLoginProblemsModal] =
    useState<boolean>(false);
  const setIsAuth = useLoginContext();
  const usernameInput = InputField({
    for: "login",
    fieldName: "username",
    label: "Username/Email",
    type: "text",
    options: {
      realtimeUpdate: false,
      regex: ["not-empty"],
      errorMsg: {
        empty: "Account cannot be empty",
      },
    },
  });
  const passwordInput = InputField({
    for: "login",
    fieldName: "password",
    label: "Password",
    type: "password",
    options: {
      realtimeUpdate: false,
      regex: ["not-empty"],
      errorMsg: {
        empty: "Password cannot be empty",
      },
    },
  });
  const errors = [usernameInput.error, passwordInput.error];
  const values = [usernameInput.value, passwordInput.value];
  const form = useRef<HTMLFormElement | null>(null);
  const submitBtn = useRef<HTMLButtonElement | null>(null);
  const loginFormContainer = useRef<HTMLDivElement | null>(null);
  const [isDisabled, setisDisabled] = useState<boolean>(true);
  const loginHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    const loginCredential = new FormData(form.current);
    for (const [key, value] of loginCredential) {
      console.log(key, value);
    }
    setIsAuth(true);
    // form.submit()
    // navigate('/news');
  };
  const closeLoginProblemsModal = useCallback(() => {
    setShowLoginProblemsModal(false);
  }, [showLoginProblemsModal]);

  useEffect(
    function disableLoginBtn() {
      const noError = errors.every((error) => error === "");
      const allHasValue = values.every(
        (value) => value !== "" && value !== undefined && value !== null
      );

      if (noError && allHasValue) {
        submitBtn.current?.classList.remove("disabled");
        setisDisabled(false);
      } else {
        submitBtn.current?.classList.add("disabled");
        setisDisabled(true);
      }
    },
    [errors, values]
  );

  !props.isOpen
    ? loginFormContainer.current?.classList.add("hidden")
    : loginFormContainer.current?.classList.remove("hidden");

  return (
    <div ref={loginFormContainer} id="login-main-container">
      <form
        data-flex-col
        ref={form}
        className="login-form"
        id="login-form"
        method="GET"
        onSubmit={(e) => loginHandler(e)}
      >
        <div className="hyv-logo"></div>
        <div className="login-form-header text-center">Account Log In</div>
        {usernameInput.component}
        {passwordInput.component}
        <button
          ref={submitBtn}
          type="submit"
          disabled={isDisabled}
          className="submit-btn disabled"
          id="login-submit-btn"
        >
          Log in
        </button>
        <div data-flex className="hyv-link hyv-register-link">
          <span>
            <a onClick={() => setShowLoginProblemsModal(true)}>
              Having Problems?
            </a>
          </span>
          <span>
            <a onClick={() => props.swapFormContent()}>Register Now</a>
          </span>
        </div>
      </form>
      {showLoginProblemsModal && (
        <LoginProblems closeModal={closeLoginProblemsModal} />
      )}
    </div>
  );
}
