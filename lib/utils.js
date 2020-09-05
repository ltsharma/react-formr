import validatorFn from "validator";
export var validator = function (type, value, rule) {
    if (type === void 0) { type = ""; }
    if (rule === void 0) { rule = ""; }
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
export var fieldBools = function (obj) {
    return Object.keys(obj).reduce(function (acc, key) {
        acc[key] = false;
        return acc;
    }, {});
};
