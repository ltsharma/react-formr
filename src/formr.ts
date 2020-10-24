import React, { useRef, useState, useCallback, useEffect } from 'react';
import { validator, fieldBools } from './utils';
import {
    BoolObject,
    FormValidation,
    FormrProps,
    FormrFunctions,
    StringObject,
    InputBinderProps
} from './Types';

const Formr: React.FC<FormrProps> = ({
    formFields,
    children,
    validation,
    disbaleAutoFocus = false,
    onChange = () => {},
    onFinishFocus = () => {}
}) => {
    // States & refs
    const [values, setValues] = useState<StringObject>(formFields);
    const [touched, setTouched] = useState<BoolObject>(fieldBools(formFields));
    const valid = useRef<BoolObject>(fieldBools(validation || {}));
    const refs = useRef<any>([]);

    // Additional listener for any change in form fields
    useEffect(() => {
        onChange(values);
    }, [values]);

    // Setting valid helper
    const setValid = useCallback(
        (key: string, validated: boolean) => {
            valid.current = { ...valid.current, [key]: validated };
        },
        [valid]
    );

    // run validation & set validation
    const fieldValidation = (key: string, value: string) => {
        if (validation && validation[key]) {
            const validationObj: FormValidation = validation[key];
            // if validation type is set
            if (validationObj.type) {
                const validation = validator(validationObj.type, value);
                setValid(key, validation);
            } else if (validationObj.rules) {
                // if validation rules is set
                const validation = validator(
                    'rules',
                    value,
                    validationObj.rules
                );
                setValid(key, validation);
            } else if (validationObj.required) {
                const validation = value !== '';
                setValid(key, validation);
            } else {
                // no validation
                setValid(key, true);
            }
        }
    };

    // Input change listner
    const onChangeHandler = useCallback<FormrFunctions['onChangeHandler']>(
        (key, value) => {
            // Set form values
            setValues((prev) => ({ ...prev, [key]: value }));
            fieldValidation(key, value);
        },
        [setValues, values]
    );

    // Input Blur listner
    const onBlurHandler = useCallback<FormrFunctions['onBlurHandler']>(
        (key) => {
            setTouched((prev) => ({ ...prev, [key]: true }));
            fieldValidation(key, values[key]);
        },
        [setTouched, values]
    );

    // formSubmit listner
    const onSubmitHandler = useCallback<FormrFunctions['onSubmitHandler']>(
        (callback) => {
            // run validation
            Object.keys(values).forEach((key) => {
                fieldValidation(key, values[key]);
            });
            const submissionAllowed: boolean = !Object.keys(formFields).some(
                (key) => {
                    // console.log(valid.current[key]);
                    // reurn true if any nonvalid formfields
                    if (
                        validation &&
                        validation[key] &&
                        validation[key].hasOwnProperty('required') &&
                        validation[key].required
                    ) {
                        return valid.current[key] === false;
                    } else {
                        // if no validation or no required fields
                        return false;
                    }
                }
            );
            // console.log({ submissionAllowed });
            if (submissionAllowed) {
                callback(values);
                return true;
            } else {
                // blurr all fields to show error if any
                Object.keys(touched).forEach(onBlurHandler);
            }
            return false;
        },
        [values, touched, valid, onBlurHandler]
    );

    // Mapping ref object to formField keys
    const refsHandler = useCallback<FormrFunctions['refsHandler']>(
        (key, ref) => {
            refs.current[Object.keys(formFields).indexOf(key)] = ref;
        },
        [formFields]
    );

    const onSubmitEditingHandler = useCallback<
        FormrFunctions['onSubmitEditingHandler']
    >(
        (key) => {
            if (disbaleAutoFocus) {
                return;
            }
            const cField = Object.keys(formFields).indexOf(key);
            const tFields = Object.keys(formFields).length;
            if (cField + 1 < tFields) {
                for (let idx = cField; idx <= tFields; idx++) {
                    const focusable =
                        refs.current[
                            Object.keys(formFields).indexOf(key) +
                                (idx - cField) +
                                1
                        ];
                    if (focusable) {
                        focusable.focus();
                        return;
                    }
                }
                onFinishFocus(values);
            } else {
                onFinishFocus(values);
            }
        },
        [formFields, onFinishFocus, values]
    );

    const inputBinder = useCallback<FormrFunctions['inputBinder']>(
        (key) => {
            return {
                onChangeText: (text: string) => onChangeHandler(key, text),
                onBlur: () => onBlurHandler(key),
                value: values[key],
                touched: touched[key],
                valid: valid.current[key],
                ref: (ref: any) => refsHandler(key, ref),
                onSubmitEditing: () => onSubmitEditingHandler(key)
            };
        },
        [onChangeHandler, onBlurHandler, values, touched, valid, formFields]
    );
    const outputRefs = { ...formFields };
    Object.keys(formFields).map((val, key) => {
        outputRefs[val] = refs.current[key];
    });

    const returnItem: FormrFunctions = {
        onChangeHandler,
        onBlurHandler,
        onSubmitEditingHandler,
        onSubmitHandler,
        inputBinder,
        refsHandler,
        refs: outputRefs,
        values,
        touched,
        valid: valid.current
    };
    return children(returnItem);
};

export default React.memo(Formr);
