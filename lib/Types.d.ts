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
export interface NullObject {
    [key: string]: null;
}
export interface StringObject {
    [key: string]: string;
}
export interface AnyObject {
    [key: string]: any;
}
export interface FormrValidation {
    [key: string]: FormValidation;
}
export interface FormrProps {
    children: any;
    formFields: StringObject;
    validation?: FormrValidation;
    onChange?: (values: StringObject) => object;
    onFinishFocuse?: (values: StringObject) => void;
}
export interface InputBinderProps {
    onChangeText: (text: string) => void;
    onBlur: () => void;
    onSubmitEditing: () => void;
    value: string;
    valid: boolean;
    touched: boolean;
    ref: any;
}
export interface FormrFunctions {
    onHandleChange: Function;
    onHandleBlur: Function;
    values: StringObject;
    touched: BoolObject;
    valid: BoolObject;
    handleSubmit: Function;
    inputBinder: Function;
    refs: AnyObject;
}
