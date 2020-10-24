
![react-formr](https://raw.githubusercontent.com/ltsharma/react-formr/master/img/formr-banner.png)

# react-formr

[![npm version](https://badge.fury.io/js/react-formr.svg)](https://badge.fury.io/js/react-formr)
[![npm](https://img.shields.io/npm/dt/react-formr.svg)](https://www.npmjs.com/package/react-formr)
![MIT](https://img.shields.io/dub/l/vibe-d.svg)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


Centralised Solution for managing values & validation in react native, the options are unlimited

# Features

1. Form validation on given rules (regex) or predefined types(email, phone, etc).
2. Input binder function includes almost everything `TextInput` required to handle form.
3. Auto focus next available input on submit press, triggering `onFinishFocus` on last input submit.
4. Input blur validation & validate on change of invalid input.
5. Listen to live changes in form using `onChange` props.

## Detailed blog post
[Easy React Native Form management with react-formr](https://dev.to/ltsharma/easy-react-native-form-management-with-react-formr-47n5)

# Installation

Yarn \
`yarn add react-formr` \
NPM \
`npm i --save react-formr`

# Example Usage

1. Import `Formr`

```javascript
import Formr from 'react-formr';
```

2. Use it

```javascript
export const App = () => {
    return (
        <View>
            <Formr
                formFields={{ email: '', phone: '' }}
                validation={{
                    email: { required: true, type: 'email' },
                    phone: { type: 'phone' }
                }}
            >
                {({
                    onChangeHandler,
                    onBlurHandler,
                    onSubmitEditingHandler,
                    onSubmitHandler,
                    inputBinder,
                    refsHandler,
                    values,
                    touched,
                    valid
                }) => {
                    <>
                        <TextInput
                            style={{
                                borderBottomColor: 'black',
                                borderWidth: 1,
                                width: '100%'
                            }}
                            onChangeText={(e) => onChangeHandler('email', e)}
                            onBlur={() => onBlurHandler('email')}
                            value={values.email}
                            ref={(ref) => refsHandler('password', ref)}
                        />
                        {touched.email && !valid.email && (
                            <Text>Not valid</Text>
                        )}
                        // Using input binder
                        <TextInput
                            style={{
                                borderBottomColor: 'black',
                                borderWidth: 1,
                                width: '100%'
                            }}
                            {...inputBinder('phone')}
                        />
                        {touched.phone && !valid.phone && (
                            <Text>Not valid</Text>
                        )}
                        <Button onPress={() => onSubmitHandler(console.log)} title="Submit" color="#841584" />
                    </>;
                }}
            </Formr>
        </View>
    );
};
```

# Options

## Formr props

| Name            | Type                       | Default                       | Description                                                                          | Example                                |
| --------------- | -------------------------- | ----------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------- |
| `formFields`    | `StringObject` (Object)    | {}                            | Form fields values                                                                   | `{email:""}`                           |
| `validation`    | `FormrValidation` (Object) | {}                            | Form fields for validation                                                           | `{email:{required:true,type:"email"}}` |
| `onChange`      | Function                   | `(values:StringObject)=>void` | Function for observing fields changes                                                |
| `onFinishFocus` | Function                   | `(values:StringObject)=>void` | Function to trigger on all input focus finished on hitting return key on last input. |                                        |

## Form control functions

To control form fields, The `Formr` component will provide a function that include

| Name                     | Type                            | Usage                                         | Descripion                                                                                                                                                                                             | Example                                                                                            |
| ------------------------ | ------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `inputBinder`            | `Function`                      | `inputBinder( key:string )`                   | Which includes almost everything of <b>`TextInput`</b>: `value`, `onChangeText`, `onBlur`, `ref`, `onSubmitEditing` also `valid` & `touched` if you are making custom input component with these props | ` <TextInput {...inputBinder('email')} />`                                                         |
| `onChangeHandler`        | `Function`                      | `onChangeHandler( key:string, value:string )` | To set value of the field, call this function with arguments: `key` - which input field to update. `value` to that field                                                                               | ` <TextInput onChangeText={ (text)=> onHandleChange("email":text) } />`                            |
| `onBlurHandler`          | `Function`                      | `onBlurHandler( key:string )`                 | To set which field is blurred, call this function with key on blurrEvent                                                                                                                               | `<TextInput onBlur={ ()=> onBlurHandler("email") } />`                                             |
| `refsHandler`            | `Function`                      | `refsHandler( key:string, ref:any )`          | To set which field is blurred, call this function with key on blurrEvent                                                                                                                               | `<TextInput ref={ (ref)=> refsHandler("email",ref) } />`                                           |
| `onSubmitEditingHandler` | `Function`                      | `onSubmitEditingHandler( key:string )`        | To set which field is blurred, call this function with key on blurrEvent                                                                                                                               | `<TextInput onSubmitEditing={ ()=> onSubmitEditingHandler("email") } />`                           |
| `onSubmitHandler`        | `Function`                      | `onSubmitHandler( callback:(values)=>{} )`    | This handle submit button & validation flow. This is used to submit form.                                                                                                                              | `<Button title="Submit" onPress={ ()=> onSubmitHandler( (values)=> submitFormToApi(values) ) } />` |
| `values`                 | `{ [key:string]:string, ... }`  | `values={ values[key] }`                      | Objct of field values, can be used for value input for the `TextInput`                                                                                                                                 | `<TextInput value={values.email} />`                                                               |
| `valid`                  | `{ [key:string]:boolean, ... }` |                                               | Its is This object contains validation results,`true`:valid and `false`:validation fail.                                                                                                               | `{!valid.email && <Text> This fields is invalid </Text>}`                                          |
| `touched`                | `{ [key:string]:boolean, ... }` |                                               | Its is used to show error message on validation fail.                                                                                                                                                  | `{touched.email && !valid.email && <Text> This fields is invalid </Text>}`                         |

# Todo

-   [ ] To add more validation types
-   [ ] To remove validator dependancy
-   [ ] Other elements & values support
