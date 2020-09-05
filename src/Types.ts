export interface FormMessages {
  empty?: string;
  error?: string;
  valid?: string;
}

export interface FormValidation {
  type?: string;
  rules?: string;
  required?: boolean;
  messages?: FormMessages;
}
export interface BoolObject {
  [key: string]: boolean;
}
export interface StringObject {
  [key: string]: string;
}

export interface FormerValidation {
  [key: string]: FormValidation;
}

export interface FormerProps {
  children: any;
  formFields: { [key: string]: string };
  validation?: FormerValidation;
  onChange?: () => object;
}

export interface FormerFunctions {
  onHandleChange: Function;
  onHandleBlur: Function;
  values: StringObject;
  touched: BoolObject;
  valid: BoolObject;
  handleSubmit: Function;
}
