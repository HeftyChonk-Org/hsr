import { IModal } from "@/features/authentication/interface";
import { useDOMObject } from "@/hooks/useDOMObject";
import ReactDOM from "react-dom";

export function RegisterAgreePrompt(props: IModal & { callback: Function }) {
  const [registerAgreePromptOverlay, registerAgreePrompt] = useDOMObject<
    [HTMLDivElement, HTMLDivElement]
  >([
    { from: "id", value: "register-agree-prompt-overlay-dialog-container" },
    { from: "id", value: "register-agree-prompt-dialog-container" },
  ]);
  const closeModal = () => {
    setTimeout(() => props.closeModal(), 300);
    registerAgreePromptOverlay?.classList.remove("overlay-dialog-animation");
    registerAgreePrompt?.classList.remove("login-dialog-animation");
  };
  const userAgreeHandler = () => {
    props.callback();
    closeModal();
  };

  registerAgreePromptOverlay?.classList.add("overlay-dialog-animation");
  registerAgreePrompt?.classList.add("login-dialog-animation");

  const component = (
    <div
      className="login-overlay-dialog-container auxiliary-overlay-dialog-container"
      id="register-agree-prompt-overlay-dialog-container"
    >
      <div className="overlay-dialog">
        <div
          data-flex-col
          className="dialog-container auxiliary-dialog-container"
          id="register-agree-prompt-dialog-container"
        >
          <button
            type="button"
            className="close-login-btn"
            onClick={() => closeModal()}
          ></button>
          <div className="auxiliary-dialog-header agreement-dialog-header">
            <span className="dialog-header">
              Terms of Service and Privacy Policy
            </span>
          </div>
          <div className="auxiliary-dialog-body agreement-dialog-body">
            <div className="agreement-body">
              <span>Please read and agree to the </span>
              <span>
                <a
                  href="https://account.hoyoverse.com/index.html?hide_back=1&hide_header=1&hide_sidebar=1&hide_footer=1&lang=en-us#/about/userAgreement"
                  target="_blank"
                  rel="noopener"
                >
                  <span>HoYoverse Account Terms of Service</span>
                </a>
              </span>
              <span> and </span>
              <span>
                <a
                  href="https://account.hoyoverse.com/index.html?hide_back=1&hide_header=1&hide_sidebar=1&hide_footer=1&lang=en-us#/about/privacy"
                  target="_blank"
                  rel="noopener"
                >
                  <span>HoYoverse Account Privacy Policy</span>
                </a>
              </span>
            </div>
          </div>
          <div
            data-flex-col
            className="auxiliary-dialog-option agreement-dialog-option"
          >
            <div className="options agreement-options">
              <a
                data-flex
                type="button"
                className="option accept main-axis-center cross-axis-center"
                onClick={() => userAgreeHandler()}
              >
                <div className="">Accept</div>
              </a>
              <a
                data-flex
                type="button"
                className="option decline main-axis-center cross-axis-center"
                onClick={() => closeModal()}
              >
                <div className="">Decline</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof window === "object") {
    return ReactDOM.createPortal(
      component,
      document.querySelector("body") as HTMLElement
    );
  }

  return component;
}
