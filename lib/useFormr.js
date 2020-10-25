var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useState, useRef, useEffect, useCallback } from 'react';
import { fieldBools, validator } from './utils';
var useFormr = function (_a) {
    var formFields = _a.formFields, validation = _a.validation, _b = _a.disbaleAutoFocus, disbaleAutoFocus = _b === void 0 ? false : _b, _c = _a.onFinishFocus, onFinishFocus = _c === void 0 ? function () { } : _c, _d = _a.onChange, onChange = _d === void 0 ? function () { } : _d;
    // States & refs
    var _e = useState(formFields), values = _e[0], setValues = _e[1];
    var _f = useState(fieldBools(formFields)), touched = _f[0], setTouched = _f[1];
    var valid = useRef(fieldBools(validation || {}));
    var refs = useRef([]);
    // Additional listener for any change in form fields
    useEffect(function () {
        onChange(values);
    }, [values]);
    // Setting valid helper
    var setValid = useCallback(function (key, validated) {
        var _a;
        valid.current = __assign(__assign({}, valid.current), (_a = {}, _a[key] = validated, _a));
    }, [valid]);
    // run validation & set validation
    var fieldValidation = function (key, value) {
        if (validation && validation[key]) {
            var validationObj = validation[key];
            // if validation type is set
            if (validationObj.type) {
                var validation_1 = validator(validationObj.type, value);
                setValid(key, validation_1);
            }
            else if (validationObj.rules) {
                // if validation rules is set
                var validation_2 = validator('rules', value, validationObj.rules);
                setValid(key, validation_2);
            }
            else if (validationObj.required) {
                var validation_3 = value !== '';
                setValid(key, validation_3);
            }
            else {
                // no validation
                setValid(key, true);
            }
        }
    };
    // Input change listner
    var onChangeHandler = useCallback(function (key, value) {
        // Set form values
        setValues(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[key] = value, _a)));
        });
        fieldValidation(key, value);
    }, [setValues, values]);
    // Input Blur listner
    var onBlurHandler = useCallback(function (key) {
        setTouched(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[key] = true, _a)));
        });
        fieldValidation(key, values[key]);
    }, [setTouched, values]);
    // formSubmit listner
    var onSubmitHandler = useCallback(function (callback) {
        // run validation
        Object.keys(values).forEach(function (key) {
            fieldValidation(key, values[key]);
        });
        var submissionAllowed = !Object.keys(formFields).some(function (key) {
            // reurn true if any nonvalid formfields
            if (validation &&
                validation[key] &&
                validation[key].hasOwnProperty('required') &&
                validation[key].required) {
                return valid.current[key] === false;
            }
            else {
                // if no validation or no required fields
                return false;
            }
        });
        if (submissionAllowed) {
            callback(values);
            return true;
        }
        else {
            // blurr all fields to show error if any
            Object.keys(touched).forEach(onBlurHandler);
        }
        return false;
    }, [values, touched, valid, onBlurHandler]);
    // Mapping ref object to formField keys
    var refsHandler = useCallback(function (key, ref) {
        refs.current[Object.keys(formFields).indexOf(key)] = ref;
    }, [formFields]);
    var onSubmitEditingHandler = useCallback(function (key) {
        if (disbaleAutoFocus) {
            return;
        }
        var cField = Object.keys(formFields).indexOf(key);
        var tFields = Object.keys(formFields).length;
        if (cField + 1 < tFields) {
            for (var idx = cField; idx <= tFields; idx++) {
                var focusable = refs.current[Object.keys(formFields).indexOf(key) +
                    (idx - cField) +
                    1];
                if (focusable) {
                    focusable.focus();
                    return;
                }
            }
            onFinishFocus(values);
        }
        else {
            onFinishFocus(values);
        }
    }, [formFields, onFinishFocus, values]);
    var inputBinder = useCallback(function (key) {
        return {
            onChangeText: function (text) { return onChangeHandler(key, text); },
            onBlur: function () { return onBlurHandler(key); },
            value: values[key],
            touched: touched[key],
            valid: valid.current[key],
            ref: function (ref) { return refsHandler(key, ref); },
            onSubmitEditing: function () { return onSubmitEditingHandler(key); }
        };
    }, [onChangeHandler, onBlurHandler, values, touched, valid, formFields]);
    var outputRefs = __assign({}, formFields);
    Object.keys(formFields).map(function (val, key) {
        outputRefs[val] = refs.current[key];
    });
    var returnItem = {
        onChangeHandler: onChangeHandler,
        onBlurHandler: onBlurHandler,
        onSubmitEditingHandler: onSubmitEditingHandler,
        onSubmitHandler: onSubmitHandler,
        inputBinder: inputBinder,
        refsHandler: refsHandler,
        refs: outputRefs,
        values: values,
        touched: touched,
        valid: valid.current
    };
    return returnItem;
};
export default useFormr;
