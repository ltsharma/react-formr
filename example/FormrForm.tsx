/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    KeyboardAvoidingView,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import { useFormr } from './../src';

export default function App(props: any) {
    const [submitedValue, setSubmittedValue] = useState({});
    const [submited, setSubmitted] = useState(false);
    const [onChangeValue, setOnChangeValue] = useState({});

    const {
        values,
        touched,
        valid,
        onSubmitHandler,
        inputBinder,
        onResetFormHandler
    } = useFormr({
        formFields: {
            name: '',
            email: '',
            password: ''
        },
        validation: props.validations,
        onChange: setOnChangeValue
    });

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            enabled={true}
            behavior="padding">
            <TouchableHighlight
                testID="resetButton"
                onPress={() => {
                    onResetFormHandler();
                }}>
                <Text>Reset</Text>
            </TouchableHighlight>
            <TouchableHighlight
                testID="resetButton2"
                onPress={() => {
                    onResetFormHandler({
                        name: 'name',
                        email: 'email',
                        password: 'password'
                    });
                }}>
                <Text>Reset With Value</Text>
            </TouchableHighlight>
            <TouchableHighlight
                testID="resetButton3"
                onPress={() => {
                    onResetFormHandler({
                        name: 'name',
                        email: 'email'
                    });
                }}>
                <Text>Reset With Value</Text>
            </TouchableHighlight>
            <ScrollView style={styles.container}>
                <Text>Former</Text>
                <View
                    style={{
                        flex: 1,
                        marginTop: 50
                    }}>
                    <Text>Welcome</Text>
                    <View style={styles.inputBox}>
                        <Text>
                            <Text
                                style={{
                                    fontWeight: '600',
                                    fontSize: 16
                                }}>
                                Email:
                            </Text>{' '}
                            Required input with email type
                        </Text>
                        <TextInput
                            style={{
                                borderColor:
                                    valid?.email != null &&
                                    touched?.email &&
                                    !valid?.email
                                        ? 'red'
                                        : 'black',
                                ...styles.input
                            }}
                            {...inputBinder('email')}
                            testID="emailInput"
                        />
                    </View>
                    <Text testID="emailInputvalue">{values.email}</Text>
                    <Text testID="emailInputvalid">
                        {valid.email ? 'true' : 'false'}
                    </Text>
                    <Text testID="emailtouched">
                        {touched.email ? 'true' : 'false'}
                    </Text>
                    <View style={styles.inputBox}>
                        <Text>
                            <Text
                                style={{
                                    fontWeight: '600',
                                    fontSize: 16
                                }}>
                                Name:
                            </Text>{' '}
                            Required input with no rules or type set
                        </Text>
                        <TextInput
                            style={{
                                borderColor:
                                    valid.name != null &&
                                    touched.name &&
                                    !valid.name
                                        ? 'red'
                                        : 'black',
                                ...styles.input
                            }}
                            testID="nameInput"
                            {...inputBinder('name')}
                        />
                    </View>
                    <Text testID="nameInputvalue">{values.name}</Text>
                    <Text testID="nameInputvalid">
                        {valid.name ? 'true' : 'false'}
                    </Text>
                    <Text testID="nameInputtouched">
                        {touched.name ? 'true' : 'false'}
                    </Text>
                    <View
                        style={{
                            backgroundColor: '#EAEAEA',
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            marginTop: 16
                        }}>
                        <Text>
                            <Text
                                style={{
                                    fontWeight: '600',
                                    fontSize: 16
                                }}>
                                Password:
                            </Text>{' '}
                            Required with rules set{' '}
                        </Text>
                        <Text>
                            Rules (regex): has two uppercase letters. has one
                            special case letter. has two digits. has three
                            lowercase letters. string is of length 8.
                        </Text>
                        <TextInput
                            style={{
                                borderColor:
                                    valid.password != null &&
                                    touched.password &&
                                    !valid.password
                                        ? 'red'
                                        : 'black',
                                ...styles.input
                            }}
                            testID="passwordInput"
                            {...inputBinder('password')}
                        />
                        <Text testID="passwordInputvalue">
                            {values.password}
                        </Text>
                        <Text testID="passwordInputvalid">
                            {valid.password ? 'true' : 'false'}
                        </Text>
                        <Text testID="passwordInputtouched">
                            {touched.password ? 'true' : 'false'}
                        </Text>
                    </View>

                    <Button
                        onPress={() =>
                            onSubmitHandler((val) => {
                                setSubmittedValue(val);
                                setSubmitted(true);
                            })
                        }
                        testID="formSubmit"
                        title="Submit"
                        color="#ff5687"
                        accessibilityLabel="Learn more about this purple button"
                    />
                    <View>
                        <Text>Submitted Values:</Text>
                        <Text>{JSON.stringify(submitedValue)}</Text>
                    </View>
                    <View testID={'submited-check'} {...{ submited }} />
                    <View>
                        <Text>On Change values:</Text>
                        <Text>{JSON.stringify(onChangeValue)}</Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff'
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    inputBox: {
        backgroundColor: '#EAEAEA',
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginTop: 16
    },
    input: {
        borderWidth: 1,
        height: 46,
        padding: 8,
        marginBottom: 16,
        marginTop: 8
    }
});
