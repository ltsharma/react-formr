import { useState, useRef, useEffect, useCallback } from 'react';

import {
    BoolObject,
    FormrFunctions,
    FormrProps,
    FormValidation,
    StringObject
} from './Types';
import { fieldBools, validator } from './utils';

const useFormr = ({
    formFields,
    validation,
    disbaleAutoFocus = false,
    onFinishFocus = () => null,
    onChange = () => null
}: FormrProps): FormrFunctions => {
    // States & refs
    const [values, setValues] = useState<StringObject>(formFields);
    const [touched, setTouched] = useState<BoolObject>(fieldBools(formFields));
    const valid = useRef<BoolObject>(fieldBools(validation || {}));
    const refs = useRef<any>([]);

    // Additional listener for any change in form fields
    useEffect(() => {
        onChange(values);
    }, [values, onChange]);

    // Setting valid helper
    const setValid = useCallback(
        (key: string, validated: boolean) => {
            valid.current = { ...valid.current, [key]: validated };
        },
        [valid]
    );

    // run validation & set validation
    const fieldValidation = useCallback(
        (key: string, value: string) => {
            if (validation && validation[key]) {
                const validationObj: FormValidation = validation[key];
                // if validation type is set
                if (validationObj.type) {
                    const interValidation = validator(
                        validationObj.type,
                        value
                    );
                    setValid(key, interValidation);
                } else if (validationObj.rules) {
                    // if validation rules is set
                    const interValidation = validator(
                        'rules',
                        value,
                        validationObj.rules
                    );
                    setValid(key, interValidation);
                } else if (validationObj.required) {
                    const interValidation = value !== '';
                    setValid(key, interValidation);
                } else {
                    // no validation
                    setValid(key, true);
                }
            }
        },
        [setValid, validation]
    );

    // Input change listner
    const onChangeHandler = useCallback<FormrFunctions['onChangeHandler']>(
        (key, value) => {
            // Set form values
            setValues((prev) => ({ ...prev, [key]: value }));
            fieldValidation(key, value);
        },
        [fieldValidation]
    );

    // Input Blur listner
    const onBlurHandler = useCallback<FormrFunctions['onBlurHandler']>(
        (key) => {
            setTouched((prev) => ({ ...prev, [key]: true }));
            fieldValidation(key, values[key]);
        },
        [fieldValidation, values]
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
            if (submissionAllowed) {
                callback(values);
                return true;
            } else {
                // blurr all fields to show error if any
                Object.keys(touched).forEach(onBlurHandler);
            }
            return false;
        },
        [
            values,
            formFields,
            fieldValidation,
            validation,
            touched,
            onBlurHandler
        ]
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
        [disbaleAutoFocus, formFields, onFinishFocus, values]
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
        [
            values,
            touched,
            onChangeHandler,
            onBlurHandler,
            refsHandler,
            onSubmitEditingHandler
        ]
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

    return returnItem;
};

export default useFormr;
