import { StringObject, BoolObject, FormValidation } from "./Types";
export declare const validator: (type: string | undefined, value: string, rule?: string) => boolean;
export declare const fieldBools: (obj: StringObject | FormValidation) => BoolObject;
