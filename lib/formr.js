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
    var formFields = _a.formFields, children = _a.children, validation = _a.validation, _b = _a.onChange, onChange = _b === void 0 ? function (vals) { } : _b;
    var _c = useState(formFields), values = _c[0], setValues = _c[1];
    var _d = useState(fieldBools(formFields)), touched = _d[0], setTouched = _d[1];
    // const [valid, setValid] = useState<BoolObject>(fieldBools(validation || {}));
    var valid = useRef(fieldBools(validation || {}));
    var setValid = useCallback(function (key, validated) {
        var _a;
        valid.current = __assign(__assign({}, valid.current), (_a = {}, _a[key] = validated, _a));
    }, [valid]);
    useEffect(function () {
        onChange(values);
    }, [values]);
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
    }, [setTouched]);
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
            valid: valid.current[key],
        };
    }, [onHandleChange, onHandleBlur, values, touched, valid]);
    var returnItem = {
        onHandleChange: onHandleChange,
        onHandleBlur: onHandleBlur,
        handleSubmit: handleSubmit,
        values: values,
        touched: touched,
        valid: valid.current,
        inputBinder: inputBinder,
    };
    return children(returnItem);
};
// export interface FormrControllerProps {
//   children: React.ReactChildren;
// }
// export const FormrController: React.FC<FormrControllerProps> = ({
//   children,
// }) => {
//   return children;
// };
export default React.memo(Formr);
