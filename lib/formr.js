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
import React, { useState, useCallback, useEffect } from "react";
import { validator, fieldBools } from "./utils";
var Formr = function (_a) {
    var formFields = _a.formFields, children = _a.children, validation = _a.validation, _b = _a.onChange, onChange = _b === void 0 ? function (vals) { } : _b;
    var _c = useState(formFields), values = _c[0], setValues = _c[1];
    var _d = useState(fieldBools(formFields)), touched = _d[0], setTouched = _d[1];
    var _e = useState(fieldBools(validation || {})), valid = _e[0], setValid = _e[1];
    useEffect(function () {
        onChange(values);
    }, [values]);
    // Input change listner
    var onHandleChange = useCallback(function (key, value) {
        // Set form values
        setValues(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[key] = value, _a)));
        });
        // run validation & set validation
        if (validation && validation[key]) {
            var validationObj_1 = validation[key];
            // if validation type is set
            if (validationObj_1.type) {
                var validation_1 = validator(validationObj_1.type, value);
                setValid(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[key] = validation_1, _a)));
                });
            }
            else if (validationObj_1.rules) {
                // if validation rules is set
                setValid(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[key] = validator("rules", value, validationObj_1.rules), _a)));
                });
            }
            else {
                // no validation
                setValid(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[key] = true, _a)));
                });
            }
        }
    }, [setValid, setValues]);
    // Input Blur listner
    var onHandleBlur = useCallback(function (key) {
        setTouched(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[key] = true, _a)));
        });
    }, [setTouched]);
    // formSubmit listner
    var handleSubmit = useCallback(function (callback) {
        var submissionAllowed = !Object.keys(formFields).some(function (key) {
            // reurn true if any nonvalid formfields
            if (validation &&
                validation[key] &&
                validation[key].hasOwnProperty("required") &&
                validation[key].required) {
                return valid[key] === false;
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
            Object.keys(touched).forEach(function (acc) {
                onHandleBlur(acc);
            });
        }
        return false;
    }, [values, touched, valid]);
    var inputBinder = useCallback(function (key) {
        return {
            onChangeText: function (text) { return onHandleChange(key, text); },
            onBlur: function () { return onHandleBlur(key); },
            value: values[key],
            touched: touched[key],
            valid: valid[key],
        };
    }, [onHandleChange, onHandleBlur, values, touched, valid]);
    var returnItem = {
        onHandleChange: onHandleChange,
        onHandleBlur: onHandleBlur,
        handleSubmit: handleSubmit,
        values: values,
        touched: touched,
        valid: valid,
        inputBinder: inputBinder,
    };
    return children(returnItem);
};
export default React.memo(Formr);
