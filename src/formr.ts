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
  onFinishFocuse = () => {},
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
        const validation = validator("rules", value, validationObj.rules);
        setValid(key, validation);
      } else if (validationObj.required) {
        const validation = value !== "";
        setValid(key, validation);
      } else {
        // no validation
        setValid(key, true);
      }
    }
  };

  // Input change listner
  const onHandleChange = useCallback(
    (key: string, value: any): void => {
      // Set form values
      setValues((prev) => ({ ...prev, [key]: value }));
      fieldValidation(key, value);
    },
    [setValues, values]
  );

  // Input Blur listner
  const onHandleBlur = useCallback(
    (key: string): void => {
      setTouched((prev) => ({ ...prev, [key]: true }));
      fieldValidation(key, values[key]);
    },
    [setTouched, values]
  );

  // formSubmit listner
  const handleSubmit = useCallback(
    (callback: (vals: StringObject) => {}): boolean => {
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
            validation[key].hasOwnProperty("required") &&
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
        Object.keys(touched).forEach(onHandleBlur);
      }
      return false;
    },
    [values, touched, valid]
  );

  const inputBinder = useCallback(
    (key: string): InputBinderProps => {
      const cField = Object.keys(formFields).indexOf(key);
      const tFields = Object.keys(formFields).length;
      return {
        onChangeText: (text: string) => onHandleChange(key, text),
        onBlur: () => onHandleBlur(key),
        value: values[key],
        touched: touched[key],
        valid: valid.current[key],
        ref: (ref: any) =>
          (refs.current[Object.keys(formFields).indexOf(key)] = ref),
        onSubmitEditing: () => {
          if (cField + 1 < tFields) {
            refs.current[Object.keys(formFields).indexOf(key) + 1].focus();
          } else {
            onFinishFocuse(values);
          }
        },
      };
    },
    [onHandleChange, onHandleBlur, values, touched, valid, formFields]
  );

  // Mapping ref object to formField keys to destruct while using
  const outputRefs = { ...formFields };
  Object.keys(formFields).map((val, key) => {
    outputRefs[val] = refs.current[key];
  });

  const returnItem: FormrFunctions = {
    onHandleChange,
    onHandleBlur,
    handleSubmit,
    values,
    touched,
    valid: valid.current,
    inputBinder,
    refs: outputRefs,
  };
  return children(returnItem);
};

export default React.memo(Formr);
