import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import FormrForm from '../example/FormrForm';
import renderer from 'react-test-renderer';
Object.defineProperty(global, 'performance', {
    writable: true
});
const validations = {
    allRequired: {
        email: { required: true, type: 'email' },
        name: { required: true },
        password: {
            required: true,
            rules: '^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$'
        }
    },
    noNameValidation: {
        email: { required: true, type: 'email' },
        password: {
            required: true,
            rules: '^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$'
        }
    },
    falseEmailValidation: {
        email: { required: false, type: 'email' },
        name: { required: true },
        password: {
            required: true,
            rules: '^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$'
        }
    }
};

const values = {
    withAllRight: {
        email: 'test@testing.com',
        name: 'Tester',
        password: 'TT@eee99'
    },
    emailInvalid: {
        email: 'testtesting',
        name: 'Tester',
        password: 'TT@eee99'
    }
};

describe('Form input test', () => {
    // const props = createTestProps();
    test('changeText', () => {
        const { getByTestId } = render(<FormrForm />);

        const input = getByTestId('nameInput');
        const output = getByTestId('nameInputvalue');
        expect(input).not.toBeNull();

        const tree = renderer.create(<FormrForm />).toJSON();
        expect(tree).toMatchSnapshot();

        const testText = 'Test';
        fireEvent(input, 'onChangeText', testText);
        expect(output.props.children).toBe(testText);
    });
});

describe('Empty submit test', () => {
    test('With all field required', () => {
        const testComponent = (
            <FormrForm validations={validations.allRequired} />
        );
        const { getByTestId } = render(testComponent);

        const button = getByTestId('formSubmit');

        // Input
        const nameInput = getByTestId('nameInput');
        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');
        const submit = getByTestId('submited-check');

        // Test
        expect(button).not.toBeNull();
        expect(nameInput).not.toBeNull();
        expect(emailInput).not.toBeNull();
        expect(passwordInput).not.toBeNull();

        fireEvent.press(button);

        // Values
        expect(nameInput.props.value).toBe('');
        expect(emailInput.props.value).toBe('');
        expect(passwordInput.props.value).toBe('');
        // Valid
        expect(nameInput.props.valid).toBe(false);
        expect(emailInput.props.valid).toBe(false);
        expect(passwordInput.props.valid).toBe(false);
        // Touched
        expect(nameInput.props.touched).toBe(true);
        expect(emailInput.props.touched).toBe(true);
        expect(passwordInput.props.touched).toBe(true);
        // Submit
        expect(submit.props.submited).toBe(false);
    });

    test('Name field without validation', () => {
        const testComponent = (
            <FormrForm validations={validations.noNameValidation} />
        );
        const { getByTestId } = render(testComponent);

        const button = getByTestId('formSubmit');

        // Input
        const nameInput = getByTestId('nameInput');
        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');
        const submit = getByTestId('submited-check');

        // Test
        expect(button).not.toBeNull();
        expect(nameInput).not.toBeNull();
        expect(emailInput).not.toBeNull();
        expect(passwordInput).not.toBeNull();
        fireEvent.press(button);

        // Values
        expect(nameInput.props.value).toBe('');
        expect(emailInput.props.value).toBe('');
        expect(passwordInput.props.value).toBe('');
        // Valid
        expect(nameInput.props.valid).toBeUndefined();
        expect(emailInput.props.valid).toBe(false);
        expect(passwordInput.props.valid).toBe(false);
        // Touched
        expect(nameInput.props.touched).toBe(true);
        expect(emailInput.props.touched).toBe(true);
        expect(passwordInput.props.touched).toBe(true);
        // Submit
        expect(submit.props.submited).toBe(false);
    });
    test('With "email" type set & validation false', () => {
        const testComponent = (
            <FormrForm validations={validations.falseEmailValidation} />
        );
        const { getByTestId } = render(testComponent);

        const button = getByTestId('formSubmit');
        const submit = getByTestId('submited-check');
        // Input
        const nameInput = getByTestId('nameInput');
        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');

        // Test
        expect(button).not.toBeNull();
        expect(nameInput).not.toBeNull();
        expect(emailInput).not.toBeNull();
        expect(passwordInput).not.toBeNull();
        fireEvent.press(button);

        // Values
        expect(nameInput.props.value).toBe('');
        expect(emailInput.props.value).toBe('');
        expect(passwordInput.props.value).toBe('');
        // Valid
        expect(nameInput.props.valid).toBe(false);
        expect(emailInput.props.valid).toBe(false);
        expect(passwordInput.props.valid).toBe(false);
        // Touched
        expect(nameInput.props.touched).toBe(true);
        expect(emailInput.props.touched).toBe(true);
        expect(passwordInput.props.touched).toBe(true);
        // Submit
        expect(submit.props.submited).toBe(false);
    });
});

describe('Submit with value test', () => {
    test('Submit success with all valid', () => {
        const testComponent = (
            <FormrForm validations={validations.allRequired} />
        );
        const { getByTestId } = render(testComponent);

        const button = getByTestId('formSubmit');
        const submit = getByTestId('submited-check');
        // Input
        const nameInput = getByTestId('nameInput');
        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');

        // Test
        expect(button).not.toBeNull();
        expect(nameInput).not.toBeNull();
        expect(emailInput).not.toBeNull();
        expect(passwordInput).not.toBeNull();

        fireEvent(nameInput, 'onChangeText', values.withAllRight.name);
        fireEvent(nameInput, 'onBlur');
        fireEvent(emailInput, 'onChangeText', values.withAllRight.email);
        fireEvent(emailInput, 'onBlur');
        fireEvent(passwordInput, 'onChangeText', values.withAllRight.password);
        fireEvent(passwordInput, 'onBlur');
        fireEvent.press(button);
        // Values
        expect(nameInput.props.value).toBe(values.withAllRight.name);
        expect(emailInput.props.value).toBe(values.withAllRight.email);
        expect(passwordInput.props.value).toBe(values.withAllRight.password);
        // Valid
        expect(nameInput.props.valid).toBe(true);
        expect(emailInput.props.valid).toBe(true);
        expect(passwordInput.props.valid).toBe(true);
        // Touched
        expect(nameInput.props.touched).toBe(true);
        expect(emailInput.props.touched).toBe(true);
        expect(passwordInput.props.touched).toBe(true);
        // Submit
        expect(submit.props.submited).toBe(true);
    });
    test('Submit fail with invalid email', () => {
        const testComponent = (
            <FormrForm validations={validations.allRequired} />
        );
        const { getByTestId } = render(testComponent);

        const button = getByTestId('formSubmit');
        const submit = getByTestId('submited-check');
        // Input
        const nameInput = getByTestId('nameInput');
        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');

        // Test
        expect(button).not.toBeNull();
        expect(nameInput).not.toBeNull();
        expect(emailInput).not.toBeNull();
        expect(passwordInput).not.toBeNull();

        fireEvent(nameInput, 'onChangeText', values.emailInvalid.name);
        fireEvent(nameInput, 'onBlur');
        fireEvent(emailInput, 'onChangeText', values.emailInvalid.email);
        fireEvent(emailInput, 'onBlur');
        fireEvent(passwordInput, 'onChangeText', values.emailInvalid.password);
        fireEvent(passwordInput, 'onBlur');
        fireEvent.press(button);
        // Values
        expect(nameInput.props.value).toBe(values.emailInvalid.name);
        expect(emailInput.props.value).toBe(values.emailInvalid.email);
        expect(passwordInput.props.value).toBe(values.emailInvalid.password);
        // Valid
        expect(nameInput.props.valid).toBe(true);
        expect(emailInput.props.valid).toBe(false);
        expect(passwordInput.props.valid).toBe(true);
        // Touched
        expect(nameInput.props.touched).toBe(true);
        expect(emailInput.props.touched).toBe(true);
        expect(passwordInput.props.touched).toBe(true);
        // Submit
        expect(submit.props.submited).toBe(false);
    });

    test('Submit success with invalid email & email is not required', () => {
        const testComponent = (
            <FormrForm validations={validations.falseEmailValidation} />
        );
        const { getByTestId } = render(testComponent);

        const button = getByTestId('formSubmit');
        const submit = getByTestId('submited-check');
        // Input
        const nameInput = getByTestId('nameInput');
        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');

        // Test
        expect(button).not.toBeNull();
        expect(nameInput).not.toBeNull();
        expect(emailInput).not.toBeNull();
        expect(passwordInput).not.toBeNull();

        fireEvent(nameInput, 'onChangeText', values.emailInvalid.name);
        fireEvent(nameInput, 'onBlur');
        fireEvent(emailInput, 'onChangeText', values.emailInvalid.email);
        fireEvent(emailInput, 'onBlur');
        fireEvent(passwordInput, 'onChangeText', values.emailInvalid.password);
        fireEvent(passwordInput, 'onBlur');
        fireEvent.press(button);
        // Values
        expect(nameInput.props.value).toBe(values.emailInvalid.name);
        expect(emailInput.props.value).toBe(values.emailInvalid.email);
        expect(passwordInput.props.value).toBe(values.emailInvalid.password);
        // Valid
        expect(nameInput.props.valid).toBe(true);
        expect(emailInput.props.valid).toBe(false);
        expect(passwordInput.props.valid).toBe(true);
        // Touched
        expect(nameInput.props.touched).toBe(true);
        expect(emailInput.props.touched).toBe(true);
        expect(passwordInput.props.touched).toBe(true);
        // Submit
        expect(submit.props.submited).toBe(true);
    });

    test('Input navigation with keyboard submit', () => {
        const testComponent = (
            <FormrForm validations={validations.falseEmailValidation} />
        );
        const { getByTestId } = render(testComponent);

        const button = getByTestId('formSubmit');
        const submit = getByTestId('submited-check');
        // Input
        const nameInput = getByTestId('nameInput');
        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');

        // Test
        expect(button).not.toBeNull();
        expect(nameInput).not.toBeNull();
        expect(emailInput).not.toBeNull();
        expect(passwordInput).not.toBeNull();

        fireEvent(nameInput, 'onChangeText', values.emailInvalid.name);
        fireEvent(nameInput, 'onSubmitEditing');
        fireEvent(nameInput, 'blur');
        fireEvent(emailInput, 'onChangeText', values.emailInvalid.email);
        fireEvent(emailInput, 'onSubmitEditing');
        fireEvent(emailInput, 'blur');
        fireEvent(passwordInput, 'onChangeText', values.emailInvalid.password);
        fireEvent(passwordInput, 'onSubmitEditing');
        fireEvent(passwordInput, 'blur');
        fireEvent.press(button);
        // Values
        expect(nameInput.props.value).toBe(values.emailInvalid.name);
        expect(emailInput.props.value).toBe(values.emailInvalid.email);
        expect(passwordInput.props.value).toBe(values.emailInvalid.password);
        // Valid
        expect(nameInput.props.valid).toBe(true);
        expect(emailInput.props.valid).toBe(false);
        expect(passwordInput.props.valid).toBe(true);
        // Touched
        expect(nameInput.props.touched).toBe(true);
        expect(emailInput.props.touched).toBe(true);
        expect(passwordInput.props.touched).toBe(true);
        // Submit
        expect(submit.props.submited).toBe(true);
    });
});

describe('Form Reset Test', () => {
    test('reset button with default form values', () => {
        const testComponent = (
            <FormrForm validations={validations.allRequired} />
        );
        const { getByTestId } = render(testComponent);

        const resetButton = getByTestId('resetButton');
        // Input
        const nameInput = getByTestId('nameInput');
        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');

        // Test
        expect(resetButton).not.toBeNull();
        expect(nameInput).not.toBeNull();
        expect(emailInput).not.toBeNull();
        expect(passwordInput).not.toBeNull();

        fireEvent(nameInput, 'onChangeText', values.emailInvalid.name);
        fireEvent(nameInput, 'onBlur');
        fireEvent(emailInput, 'onChangeText', values.emailInvalid.email);
        fireEvent(emailInput, 'onBlur');
        fireEvent(passwordInput, 'onChangeText', values.emailInvalid.password);
        fireEvent(passwordInput, 'onBlur');

        fireEvent.press(resetButton);

        // Values
        expect(nameInput.props.value).toBe('');
        expect(emailInput.props.value).toBe('');
        expect(passwordInput.props.value).toBe('');
        // Valid
        expect(nameInput.props.valid).toBe(false);
        expect(emailInput.props.valid).toBe(false);
        expect(passwordInput.props.valid).toBe(false);
        // Touched
        expect(nameInput.props.touched).toBe(false);
        expect(emailInput.props.touched).toBe(false);
        expect(passwordInput.props.touched).toBe(false);
        //  // Submit
        //  expect(submit.props.submited).toBe(true);
    });

    test('reset button with new values', () => {
        const testComponent = (
            <FormrForm validations={validations.allRequired} />
        );
        const { getByTestId } = render(testComponent);

        const resetButton = getByTestId('resetButton2');
        // Input
        const nameInput = getByTestId('nameInput');
        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');

        // Test
        expect(resetButton).not.toBeNull();
        expect(nameInput).not.toBeNull();
        expect(emailInput).not.toBeNull();
        expect(passwordInput).not.toBeNull();

        fireEvent(nameInput, 'onChangeText', values.emailInvalid.name);
        fireEvent(nameInput, 'onBlur');
        fireEvent(emailInput, 'onChangeText', values.emailInvalid.email);
        fireEvent(emailInput, 'onBlur');
        fireEvent(passwordInput, 'onChangeText', values.emailInvalid.password);
        fireEvent(passwordInput, 'onBlur');

        fireEvent.press(resetButton);

        // Values
        expect(nameInput.props.value).toBe('name');
        expect(emailInput.props.value).toBe('email');
        expect(passwordInput.props.value).toBe('password');
        // Valid
        expect(nameInput.props.valid).toBe(false);
        expect(emailInput.props.valid).toBe(false);
        expect(passwordInput.props.valid).toBe(false);
        // Touched
        expect(nameInput.props.touched).toBe(false);
        expect(emailInput.props.touched).toBe(false);
        expect(passwordInput.props.touched).toBe(false);
        //  // Submit
        //  expect(submit.props.submited).toBe(true);
    });
});
