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

export type AnyObject<T> = {
    [key in keyof T]: any;
};

export type FormrValidation<T> = {
    [key in keyof T]: FormValidation;
};

export interface FormrProps<T> {
    /** Object of form fields which the formr needs to handle */
    formFields: T;

    /** Object of validation with respect to formFields */
    validation?: Partial<FormrValidation<T>>;

    /** Control to disable autofocuse on return of input */
    disbaleAutoFocus?: boolean;

    /** The function used to lisen form field changes */
    onChange?: (values: T) => void;

    /** Function will be triggered after finished focusing the form inputs */
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
    /** Function to update form field values with field key & new field value
     *
     * @param {string} key - Key of the form field
     * @param {any} value - Value of the form field
     *
     * e.g, onChangeHandler("name","New Name")  */
    onChangeHandler: (key: keyof T, value: any) => void;

    /** Function to update form touched/focused status, calling this will set focused state to true
     *
     * @param {string} key - Key of the form field
     *
     * e.g, onBlurHandler("name")  */
    onBlurHandler: (key: keyof T) => void;

    /** Function to be triggered when return key pressed (after finished editing) in the field, which will focus next field if available
     *
     * @param {string} key - Key of the form field
     *
     * e.g, onSubmitEditingHandler("name")  */
    onSubmitEditingHandler: (key: keyof T) => void;

    /** Function to be triggered when the form to be submitted, the passed callback function will be called all the validation passed
     *
     * @param {function} callback(value) - callback function will be called with values when the validation is passed.
     *
     * e.g, onSubmitEditingHandler("name")  */
    onSubmitHandler: (callback: (values: T) => void) => boolean;

    /** Function which consista all the handler which TextInput requires to handle values & focuse
     *
     * @param {string} key - key of the form fiels
     *
     * e.g, <TextInput {...inputBinder("name")} />  */
    inputBinder: (key: keyof T) => InputBinderProps;

    /** Function to update refs of in form input
     *
     * @param {string} key - Key of the form field
     * @param {any} ref - ref of the form field
     *
     * e.g, onChangeHandler("name","New Name")  */
    refsHandler: (key: keyof T, ref: any) => void;

    /** Function to reset form values, focused states & valid states
     *
     * @param {object} resetValue - Key of the form field
     *
     * e.g, onResetFormHandler("name","New Name")  */
    onResetFieldHandler: (key: keyof T) => void;

    /** Function to reset form values, focused states & valid states
     *
     * @param {object} resetValue - Key of the form field
     *
     * e.g, onResetFormHandler("name","New Name")  */
    onResetFormHandler: (resetValue?: Partial<T>) => void;

    /** Array of refs on form's inputs */
    refs: AnyObject<T>;

    /** Updated form values */
    values: T;

    /** Form field touched states, which can be used to show field error*/
    touched: DerivedBoolObject<T>;

    /** Form field valid states*/
    valid: DerivedBoolObject<T>;
}
