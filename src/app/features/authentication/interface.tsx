export type errorMsg = {
  empty?: string;
  invalid?: string;
};

export type inputRegex = "email" | "password" | "matched" | "not-empty";
export type inputConstraints = "numericOnly";

export type Form = {
  isOpen: boolean;
  swapFormContent: Function;
};

export interface LoginFormProps extends Form {
  username?: string;
}

export interface RegisterFormProps extends Form {}

export type RegisterFormData = {
  email: string;
  verification_code: string;
  password: string;
  confirm_password: string;
  policy_agreement: "on";
};

export type UserLoginCred = {
  username: string;
  password: string;
};

export type IModal = {
  closeModal: Function;
};
