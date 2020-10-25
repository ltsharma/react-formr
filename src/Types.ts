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
    formFields: StringObject;
    validation?: FormrValidation;
    disbaleAutoFocus?: boolean;
    onChange?: (values: StringObject) => void;
    onFinishFocus?: (values: StringObject) => void;
}

export interface FormrWrapperProps extends FormrProps {
    children?: any;
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
    onChangeHandler: (key: string, value: any) => void;
    onBlurHandler: (key: string) => void;
    onSubmitEditingHandler: (key: string) => void;
    onSubmitHandler: (callback: (values: StringObject) => void) => boolean;
    inputBinder: (key: string) => InputBinderProps;
    refsHandler: (key: string, ref: any) => void;
    refs: AnyObject;
    values: StringObject;
    touched: BoolObject;
    valid: BoolObject;
}
