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
export type BoolObject = {
    [key: string]: boolean;
};
export type DerivedBoolObject<T> = {
    [key in keyof T]: boolean;
};
export interface NullObject {
    [key: string]: null;
}
export interface StringObject {
    [key: string]: string;
}

export interface AnyObject {
    [key: string]: any;
}

export type FormrValidation<T> = {
    [key in keyof T]: FormValidation;
};

export interface FormrProps<T> {
    formFields: T;
    validation?: FormrValidation<T>;
    disbaleAutoFocus?: boolean;
    onChange?: (values: T) => void;
    onFinishFocus?: (values: T) => void;
}

export interface FormrWrapperProps<T> extends FormrProps<T> {
    children?: any;
}
export interface InputBinderProps {
    onChangeText: (text: string) => void;
    onBlur: () => void;
    onSubmitEditing: () => void;
    value: any;
    valid: boolean;
    touched: boolean;
    ref: any;
}
export interface FormrFunctions<T> {
    onChangeHandler: (key: keyof T, value: any) => void;
    onBlurHandler: (key: keyof T) => void;
    onSubmitEditingHandler: (key: keyof T) => void;
    onSubmitHandler: (callback: (values: T) => void) => boolean;
    inputBinder: (key: keyof T) => InputBinderProps;
    refsHandler: (key: keyof T, ref: any) => void;
    refs: AnyObject;
    values: T;
    touched: DerivedBoolObject<T>;
    valid: DerivedBoolObject<T>;
}
