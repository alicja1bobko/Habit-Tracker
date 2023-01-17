import * as yup from "yup";

export const createHabitSchema = yup.object().shape({
  habitName: yup.string().required("Can't be empty!"),
  description: yup.string().required("Can't be empty!"),
  frequency: yup.array().min(1, "Select at least one day"),
});
