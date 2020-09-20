import validatorFn from "validator";
import { StringObject, BoolObject, FormValidation, NullObject } from "./Types";
export const validator = (
  type: string = "",
  value: string,
  rule: string = ""
): boolean => {
  switch (type) {
    case "email":
      return validatorFn.isEmail(value);
    case "password":
      return validatorFn.isLength(value, { min: 6, max: 20 });
    case "name":
      return validatorFn.isAlpha(value);
    case "phone":
      return validatorFn.isMobilePhone(value);
    case "rules":
      return validatorFn.matches(value, rule);
    default:
      return value !== "" && value !== null;
  }
};

export const fieldBools = (obj: StringObject | FormValidation) =>
  Object.keys(obj).reduce((acc: BoolObject, key: string) => {
    acc[key] = false;
    return acc;
  }, {});

export const fieldNulls = (obj: StringObject | FormValidation) =>
  Object.keys(obj).reduce((acc: NullObject, key: string) => {
    acc[key] = null;
    return acc;
  }, {});
