import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import Former, { Types as FormrTypes } from 'react-formr';

export default function App() {
    const [submitedValue, setSubmittedValue] = useState({});
    const [onChangeValue, setOnChangeValue] = useState({});
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior="padding">
            <ScrollView style={styles.container}>
                <Text>Former</Text>
                <Former
                    onChange={setOnChangeValue}
                    formFields={{
                        email: '',
                        name: '',
                        password: ''
                    }}
                    validation={{
                        email: { required: true, type: 'email' },
                        name: {
                            required: true
                        },
                        password: {
                            required: true,
                            rules:
                                '^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$'
                        }
                    }}
                >
                    {({
                        values,
                        touched,
                        valid,
                        onSubmitHandler,
                        inputBinder
                    }: FormrTypes.FormrFunctions) => {
                        console.log({ values, touched, valid });
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    marginTop: 50
                                }}
                            >
                                <View style={styles.inputBox}>
                                    <Text>
                                        <Text
                                            style={{
                                                fontWeight: '600',
                                                fontSize: 16
                                            }}
                                        >
                                            Email:
                                        </Text>{' '}
                                        Required input with email type
                                    </Text>
                                    <TextInput
                                        style={{
                                            borderColor:
                                                valid.email != null &&
                                                touched.email &&
                                                !valid.email
                                                    ? 'red'
                                                    : 'black',
                                            ...styles.input
                                        }}
                                        {...inputBinder('email')}
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text>
                                        <Text
                                            style={{
                                                fontWeight: '600',
                                                fontSize: 16
                                            }}
                                        >
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
                                        {...inputBinder('name')}
                                    />
                                </View>
                                <View
                                    style={{
                                        backgroundColor: '#EAEAEA',
                                        paddingHorizontal: 16,
                                        paddingVertical: 8,
                                        marginTop: 16
                                    }}
                                >
                                    <Text>
                                        <Text
                                            style={{
                                                fontWeight: '600',
                                                fontSize: 16
                                            }}
                                        >
                                            Password:
                                        </Text>{' '}
                                        Required with rules set{' '}
                                    </Text>
                                    <Text>
                                        Rules (regex): has two uppercase
                                        letters. has one special case letter.
                                        has two digits. has three lowercase
                                        letters. string is of length 8.
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
                                        {...inputBinder('password')}
                                    />
                                </View>

                                <Button
                                    onPress={() =>
                                        onSubmitHandler(setSubmittedValue)
                                    }
                                    title="Submit"
                                    color="#ff5687"
                                    accessibilityLabel="Learn more about this purple button"
                                />
                                <View>
                                    <Text>Submitted Values:</Text>
                                    <Text>{JSON.stringify(submitedValue)}</Text>
                                </View>
                                <View>
                                    <Text>On Change values:</Text>
                                    <Text>{JSON.stringify(onChangeValue)}</Text>
                                </View>
                            </View>
                        );
                    }}
                </Former>

                <StatusBar style="auto" />
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
