import * as Yup from 'yup';

export const signUpSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!'),
  password: Yup.string()
    .min(8, 'Password has to be longer than 8 characters!')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter!')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter!')
    .matches(/[0-9]/, 'Password must contain at least one digit!')
    .matches(/[^a-zA-Z\d]/, 'Password must contain at least one special character!')
    .required('Password is required!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required!'),
});

export const confirmRegistrationSchema = Yup.object({
  code: Yup.string()
    .required('Confirmation Code is required!'),
});