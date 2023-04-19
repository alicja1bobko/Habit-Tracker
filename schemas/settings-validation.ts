import * as yup from "yup";
import isEmailValidator from "validator/lib/isEmail";

export const settingsSchema = yup.object().shape({
  firstName: yup.string().nullable().optional(),
  lastName: yup.string().nullable().optional(),
  password: yup
    .string()
    .min(6, "Password is too short, it should be at least 6 characters")
    .matches(
      /^.*[!@#$%^&*()_+\-=\[\]{};':"|,.<>/?].*$/,
      "Password must contain at least one special character"
    ),
  email: yup
    .string()
    .nullable()
    .optional()
    .test(
      "is-valid",
      (message) => `${message.path} is invalid`,
      (value) =>
        value
          ? isEmailValidator(value)
          : new yup.ValidationError("Invalid value")
    ),
});
