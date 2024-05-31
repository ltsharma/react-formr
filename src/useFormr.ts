import { useState, useRef, useEffect, useCallback } from 'react';

import {
    DerivedBoolObject,
    FormrFunctions,
    FormrProps,
    FormValidation,
    InputBinderProps
} from './Types';
import { fieldBools, validator } from './utils';

const useFormr = <T extends object>({
    formFields,
    validation,
    disbaleAutoFocus = false,
    onFinishFocus = () => null,
    onChange = () => null
}: FormrProps<T>): FormrFunctions<T> => {
    // States & refs
    const [values, setValues] = useState<T>(formFields);
    const [touched, setTouched] = useState(fieldBools<T>(formFields));
    const valid = useRef<DerivedBoolObject<T>>(
        fieldBools(validation || {}) as DerivedBoolObject<T>
    );
    const refs = useRef<any>([]);

    // Additional listener for any change in form fields
    useEffect(() => {
        onChange(values);
    }, [values, onChange]);

    // Setting valid helper
    const setValid = useCallback((key: keyof T, validated: boolean) => {
        valid.current = { ...valid.current, [key]: validated };
    }, []);

    // run validation & set validation
    const fieldValidation = useCallback(
        (key: keyof T, value: string | any) => {
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
    const onChangeHandler = useCallback<FormrFunctions<T>['onChangeHandler']>(
        (key, value) => {
            // Set form values
            setValues((prev: any) => ({ ...prev, [key]: value }));
            fieldValidation(key, value);
        },
        [fieldValidation]
    );

    // Form reset handler
    const onResetFormHandler = useCallback<
        FormrFunctions<T>['onResetFormHandler']
    >(
        (resetValues) => {
            const values = { ...formFields, ...(resetValues ?? {}) };
            setValues(values);
            setTouched(fieldBools(values));
            valid.current = fieldBools(
                validation ?? {}
            ) as DerivedBoolObject<T>;
        },
        [valid.current, setValues, setTouched]
    );

    const onResetFieldHandler = useCallback<
        FormrFunctions<T>['onResetFieldHandler']
    >(
        (key) => {
            onChangeHandler(key, formFields[key]);
            setTouched((prev) => ({ ...prev, [key]: false }));
            setValid(key, false);
        },
        [onChangeHandler, setTouched, setValid]
    );

    // Input Blur listner
    const onBlurHandler = useCallback<FormrFunctions<T>['onBlurHandler']>(
        (key: keyof T) => {
            setTouched((prev) => ({ ...prev, [key]: true }));
            fieldValidation(key, values[key as keyof T]);
        },
        [fieldValidation, values]
    );

    // formSubmit listner
    const onSubmitHandler = useCallback<FormrFunctions<T>['onSubmitHandler']>(
        (callback) => {
            // run validation
            (Object.keys(values) as Array<keyof T>).forEach((key: keyof T) => {
                fieldValidation(key, values[key]);
            });
            const submissionAllowed: boolean = !(
                Object.keys(formFields) as Array<keyof T>
            ).some((key: keyof T) => {
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
            });
            if (submissionAllowed) {
                callback(values);
                return true;
            } else {
                // blurr all fields to show error if any
                Object.keys(touched).forEach((key) => {
                    onBlurHandler(key as keyof T);
                });
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
    const refsHandler = useCallback<FormrFunctions<T>['refsHandler']>(
        (key, ref) => {
            refs.current[
                (Object.keys(formFields) as Array<keyof T>).indexOf(key)
            ] = ref;
        },
        [formFields]
    );

    const onSubmitEditingHandler = useCallback<
        FormrFunctions<T>['onSubmitEditingHandler']
    >(
        (key) => {
            if (disbaleAutoFocus) {
                return;
            }
            const cField = (Object.keys(formFields) as Array<keyof T>).indexOf(
                key
            );
            if (refs.current[cField]?.multiline) {
                return;
            }
            const tFields = Object.keys(formFields).length;
            if (cField + 1 < tFields) {
                for (let idx = cField; idx <= tFields; idx++) {
                    const focusable =
                        refs.current[
                            (Object.keys(formFields) as Array<keyof T>).indexOf(
                                key
                            ) +
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

    const inputBinder = useCallback<FormrFunctions<T>['inputBinder']>(
        (key: keyof T): InputBinderProps => {
            return {
                onChangeText: (text: any) => onChangeHandler(key, text),
                onBlur: () => onBlurHandler(key),
                value: values[key as keyof T],
                touched: touched[key as keyof T],
                valid: valid.current[key as keyof T],
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

    const outputRefs: any = { ...formFields };
    Object.keys(formFields).map((val, key) => {
        outputRefs[val] = refs.current[key];
    });

    const returnItem: FormrFunctions<T> = {
        onChangeHandler,
        onBlurHandler,
        onSubmitEditingHandler,
        onSubmitHandler,
        onResetFieldHandler,
        onResetFormHandler,
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
