import React, { useRef, useState, useCallback, useEffect } from "react";
import { validator, fieldBools } from "./utils";
import {
  BoolObject,
  FormValidation,
  FormerProps,
  FormerFunctions,
  StringObject,
} from "./Types";

const Former: React.FC<FormerProps> = ({
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

  const onHandleChange = useCallback(
    (key: string, value: any): void => {
      setValues((prev) => ({ ...prev, [key]: value }));
      if (validation && validation[key]) {
        const validationObj: FormValidation = validation[key];
        if (validationObj.type) {
          setValid((prev) => ({
            ...prev,
            [key]: validator(validationObj.type, value),
          }));
        }
        if (validationObj.rules) {
          setValid((prev) => ({
            ...prev,
            [key]: validator(validationObj.type, value, validationObj.rules),
          }));
        } else {
          setValid((prev) => ({
            ...prev,
            [key]: true,
          }));
        }
      }
    },
    [setValues]
  );
  const onHandleBlur = useCallback(
    (key: string): void => {
      setTouched((prev) => ({ ...prev, [key]: true }));
    },
    [setTouched]
  );
  const handleSubmit = useCallback(
    (callback: (vals: StringObject) => {}): boolean => {
      const submissionAllowed: boolean = Object.keys(formFields).some((key) => {
        if (
          validation &&
          valid &&
          validation[key].hasOwnProperty("required") &&
          validation[key].required
        ) {
          return !valid[key];
        } else {
          return false;
        }
      });
      if (submissionAllowed) {
        callback(values);
      } else {
        setTouched((prev) => {
          const copy = { ...prev };
          Object.keys(touched).forEach((acc) => {
            copy[acc] = true;
            return acc;
          });
          return copy;
        });
      }
      return false;
    },
    []
  );

  const returnItem: FormerFunctions = {
    onHandleChange,
    onHandleBlur,
    values,
    touched,
    valid,
    handleSubmit,
  };
  return children(returnItem);
};

export default React.memo(Former);
