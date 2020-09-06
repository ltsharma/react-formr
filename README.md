# react-formr

Centralised Solution for managing values & validation in react native

# Installation

Yarn \
`yarn add react-formr` \
NPM \
`npm i --save react-formr`

# Example Usage

1. Import `Formr`

```javascript
import Formr from "react-formr";
```

2. Use it

```javascript
export const App = () => {
  return (
    <View>
      <Formr
        formFields={{ email: "", phone: "" }}
        validation={{
          email: { required: true, type: "email" },
          phone: { type: "phone" },
        }}>
        {({
          onHandleChange,
          values,
          onHandleBlur,
          touched,
          valid,
          handleSubmit,
        }) => {
          <>
            <TextInput
              style={{
                borderBottomColor: "black",
                borderWidth: 1,
                width: "100%",
              }}
              onChangeText={(e) => onHandleChange("email", e)}
              onBlur={() => onHandleBlur("email")}
              value={values.email}
            />
            {touched.email && !valid.email && <Text>Not valid</Text>}

            <TextInput
              style={{
                borderBottomColor: "black",
                borderWidth: 1,
                width: "100%",
              }}
              onChangeText={(e) => onHandleChange("phone", e)}
              onBlur={() => onHandleBlur("phone")}
              value={values.phone}
            />
            {touched.phone && !valid.phone && <Text>Not valid</Text>}
            <Button
              onPress={() => handleSubmit(console.log)}
              title="Submit"
              color="#841584"
            />
          </>;
        }}
      </Formr>
    </View>
  );
};
```

# Options

## Formr props

| Name         | Type                       | Default | Description                           | Example                                |
| ------------ | -------------------------- | ------- | ------------------------------------- | -------------------------------------- |
| `formFields` | `StringObject` (Object)    | {}      | Form fields values                    | `{email:""}`                           |
| `validation` | `FormrValidation` (Object) | {}      | Form fields for validation            | `{email:{required:true,type:"email"}}` |
| `onChange`   | Function                   | ()=>{}  | Function for observing fields changes |                                        |

## Form control function args

| Name             | Type                           | Usage                                        | Descripion                                                                                                               | Example                                                                                         |
| ---------------- | ------------------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `onHandleChange` | `Function`                     | `onHandleChange( key:string, value:string )` | To set value of the field, call this function with arguments: `key` - which input field to update. `value` to that field | ` <TextInput onChangeText={ (text)=> onHandleChange("email":text) } />`                         |
| `onHandleBlur`   | `Function`                     | `onHandleBlur( key:string )`                 | To set which field is blurred, call this function with key on blurrEvent                                                 | `<TextInput onBlur={ ()=> onHandleBlur("email") } />`                                           |
| `handleSubmit`   | `Function`                     | `handleSubmit( callback:(values)=>{} )`      | This handle submit button & validation flow. This is used to submit form.                                                | `<Button title="Submit" onPress={ ()=> handleSubmit( (values)=> submitFormToApi(values) ) } />` |
| `values`         | `{ [key:string]:string, ... }` | `values={ values[key] }`                     | Objct of field values, can be used for value input for the `TextInput`                                                   | `<TextInput value={values.email} />`                                                            |
| `valid`          | `{ [key:string]:boolean,... }` |                                              | Its is This object contains validation results,`true`:valid and `false`:validation fail.                                 | `{!valid.email && <Text> This fields is invalid </Text>}`                                       |
| `touched`        | `{ [key:string]:boolean,... }` |                                              | Its is used to show error message on validation fail.                                                                    | `{touched.email && !valid.email && <Text> This fields is invalid </Text>}`                      |
