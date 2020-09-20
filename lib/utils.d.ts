import { StringObject, BoolObject, FormValidation, NullObject } from "./Types";
export declare const validator: (type: string | undefined, value: string, rule?: string) => boolean;
export declare const fieldBools: (obj: StringObject | FormValidation) => BoolObject;
export declare const fieldNulls: (obj: StringObject | FormValidation) => NullObject;
