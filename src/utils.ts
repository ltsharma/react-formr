import validatorFn from 'validator';
import {
    StringObject,
    FormValidation,
    NullObject,
    DerivedBoolObject
} from './Types';
export const validator = (
    type: string = '',
    value: string,
    rule: string = ''
): boolean => {
    switch (type) {
        case 'email':
            return validatorFn.isEmail(value);
        case 'password':
            return validatorFn.isLength(value, { min: 6, max: 20 });
        case 'name':
            return validatorFn.isAlpha(value);
        case 'phone':
            return validatorFn.isMobilePhone(value);
        case 'rules':
            return validatorFn.matches(value, rule);
        default:
            return value !== '' && value !== null;
    }
};

export const fieldBools = <T extends object>(obj: T): DerivedBoolObject<T> => {
    return (Object.keys(obj) as Array<keyof T>).reduce((result, key) => {
        result[key] = false;
        return result;
    }, {} as DerivedBoolObject<T>);
};

export const fieldNulls = (obj: StringObject | FormValidation) =>
    Object.keys(obj).reduce((acc: NullObject, key: string) => {
        acc[key] = null;
        return acc;
    }, {});
