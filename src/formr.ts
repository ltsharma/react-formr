import React, { useRef, useState, useCallback, useEffect } from "react";
import { validator, fieldBools } from "./utils";
import {
  BoolObject,
  FormValidation,
  FormrProps,
  FormrFunctions,
  StringObject,
  InputBinderProps,
} from "./Types";

const Formr: React.FC<FormrProps> = ({
  formFields,
  children,
  validation,
  onChange = (vals: StringObject) => {},
}) => {
  const [values, setValues] = useState<StringObject>(formFields);
  const [touched, setTouched] = useState<BoolObject>(fieldBools(formFields));
  const [valid, setValid] = useState<BoolObject>(fieldBools(validation || {}));

  useEffect(() => {
    onChange(values);
  }, [values]);

  // Input change listner
  const onHandleChange = useCallback(
    (key: string, value: any): void => {
      // Set form values
      setValues((prev) => ({ ...prev, [key]: value }));

      // run validation & set validation
      if (validation && validation[key]) {
        const validationObj: FormValidation = validation[key];
        // if validation type is set
        if (validationObj.type) {
          const validation = validator(validationObj.type, value);
          setValid((prev) => ({
            ...prev,
            [key]: validation,
          }));
        } else if (validationObj.rules) {
          // if validation rules is set
          setValid((prev) => ({
            ...prev,
            [key]: validator("rules", value, validationObj.rules),
          }));
        } else {
          // no validation
          setValid((prev) => ({
            ...prev,
            [key]: true,
          }));
        }
      }
    },
    [setValid, setValues]
  );

  // Input Blur listner
  const onHandleBlur = useCallback(
    (key: string): void => {
      setTouched((prev) => ({ ...prev, [key]: true }));
    },
    [setTouched]
  );

  // formSubmit listner
  const handleSubmit = useCallback(
    (callback: (vals: StringObject) => {}): boolean => {
      const submissionAllowed: boolean = !Object.keys(formFields).some(
        (key) => {
          // reurn true if any nonvalid formfields
          if (
            validation &&
            validation[key] &&
            validation[key].hasOwnProperty("required") &&
            validation[key].required
          ) {
            return valid[key] === false;
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
        Object.keys(touched).forEach((acc) => {
          onHandleBlur(acc);
        });
      }
      return false;
    },
    [values, touched, valid]
  );

  const inputBinder = useCallback(
    (key: string): InputBinderProps => {
      return {
        onChangeText: (text: string) => onHandleChange(key, text),
        onBlur: () => onHandleBlur(key),
        value: values[key],
        touched: touched[key],
        valid: valid[key],
      };
    },
    [onHandleChange, onHandleBlur, values, touched, valid]
  );

  const returnItem: FormrFunctions = {
    onHandleChange,
    onHandleBlur,
    handleSubmit,
    values,
    touched,
    valid,
    inputBinder,
  };
  return children(returnItem);
};

export default React.memo(Formr);
