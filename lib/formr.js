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
import React, { useRef, useState, useCallback, useEffect } from "react";
import { validator, fieldBools } from "./utils";
var Formr = function (_a) {
    var formFields = _a.formFields, children = _a.children, validation = _a.validation, _b = _a.onChange, onChange = _b === void 0 ? function (vals) { } : _b, _c = _a.onFinishFocuse, onFinishFocuse = _c === void 0 ? function () { } : _c;
    // States & refs
    var _d = useState(formFields), values = _d[0], setValues = _d[1];
    var _e = useState(fieldBools(formFields)), touched = _e[0], setTouched = _e[1];
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
                var validation_2 = validator("rules", value, validationObj.rules);
                setValid(key, validation_2);
            }
            else if (validationObj.required) {
                var validation_3 = value !== "";
                setValid(key, validation_3);
            }
            else {
                // no validation
                setValid(key, true);
            }
        }
    };
    // Input change listner
    var onHandleChange = useCallback(function (key, value) {
        // Set form values
        setValues(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[key] = value, _a)));
        });
        fieldValidation(key, value);
    }, [setValues, values]);
    // Input Blur listner
    var onHandleBlur = useCallback(function (key) {
        setTouched(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[key] = true, _a)));
        });
        fieldValidation(key, values[key]);
    }, [setTouched, values]);
    // formSubmit listner
    var handleSubmit = useCallback(function (callback) {
        // run validation
        Object.keys(values).forEach(function (key) {
            fieldValidation(key, values[key]);
        });
        var submissionAllowed = !Object.keys(formFields).some(function (key) {
            // reurn true if any nonvalid formfields
            if (validation &&
                validation[key] &&
                validation[key].hasOwnProperty("required") &&
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
            Object.keys(touched).forEach(onHandleBlur);
        }
        return false;
    }, [values, touched, valid]);
    var inputBinder = useCallback(function (key) {
        var cField = Object.keys(formFields).indexOf(key);
        var tFields = Object.keys(formFields).length;
        return {
            onChangeText: function (text) { return onHandleChange(key, text); },
            onBlur: function () { return onHandleBlur(key); },
            value: values[key],
            touched: touched[key],
            valid: valid.current[key],
            ref: function (ref) {
                return (refs.current[Object.keys(formFields).indexOf(key)] = ref);
            },
            onSubmitEditing: function () {
                if (cField + 1 < tFields) {
                    refs.current[Object.keys(formFields).indexOf(key) + 1].focus();
                }
                else {
                    onFinishFocuse(values);
                }
            },
        };
    }, [onHandleChange, onHandleBlur, values, touched, valid, formFields]);
    // Mapping ref object to formField keys to destruct while using
    var outputRefs = __assign({}, formFields);
    Object.keys(formFields).map(function (val, key) {
        outputRefs[val] = refs.current[key];
    });
    var returnItem = {
        onHandleChange: onHandleChange,
        onHandleBlur: onHandleBlur,
        handleSubmit: handleSubmit,
        values: values,
        touched: touched,
        valid: valid.current,
        inputBinder: inputBinder,
        refs: outputRefs,
    };
    return children(returnItem);
};
export default React.memo(Formr);
