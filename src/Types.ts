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

export interface FormrValidation {
  [key: string]: FormValidation;
}

export interface FormrProps {
  children: any;
  formFields: { [key: string]: string };
  validation?: FormrValidation;
  onChange?: () => object;
}

export interface FormrFunctions {
  onHandleChange: Function;
  onHandleBlur: Function;
  values: StringObject;
  touched: BoolObject;
  valid: BoolObject;
  handleSubmit: Function;
}
