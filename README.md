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
                width: 100,
              }}
              onChangeText={(e) => onHandleChange("phone", e)}
              onBlur={() => onHandleBlur("phone")}
              value={values.phone}
            />
            {touched.phone && !valid.phone && <Text>Not valid</Text>}
            <Button
              onPress={() => handleSubmit(console.log)}
              title="Learn More"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
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
