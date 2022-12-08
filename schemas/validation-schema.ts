import * as yup from "yup";
import isEmailValidator from "validator/lib/isEmail";

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .test(
      "is-valid",
      (message) => `${message.path} is invalid`,
      (value) =>
        value
          ? isEmailValidator(value)
          : new yup.ValidationError("Invalid value")
    ),
  password: yup
    .string()
    .min(6, "Password is too short, it should be at least 6 characters")
    .matches(
      /^.*[!@#$%^&*()_+\-=\[\]{};':"|,.<>/?].*$/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});
