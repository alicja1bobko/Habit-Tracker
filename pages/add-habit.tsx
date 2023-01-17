import React, { ReactElement } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import { NextPageWithLayout } from "./_app";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { weekdaysTable } from "../utils/weekdays";
import { createHabitSchema } from "../schemas/create-habit";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../pages/api/firebase";
import useAuth from "../context/auth-context";

type FormValues = {
  habitName: string;
  description: string;
  frequency: number[];
};

const initializeHabit = {
  habitName: "",
  description: "",
  frequency: [],
};

const addHabitPage: NextPageWithLayout = () => {
  const { user } = useAuth();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<FormValues>({
    defaultValues: initializeHabit,
    resolver: yupResolver(createHabitSchema),
  });

  const onSubmitHandler: SubmitHandler<FormValues> = async ({
    habitName,
    description,
    frequency,
  }) => {
    const habitsCol = collection(db, `users/${user?.uid}/habits`);
    await addDoc(habitsCol, {
      name: habitName,
      description: description,
      frequency: frequency,
    });

    reset();
  };

  const handleCheckbox = (dayIndex: number) => {
    const checkedDays = getValues().frequency;

    const newDays = checkedDays?.includes(dayIndex)
      ? checkedDays?.filter((v) => v !== dayIndex)
      : [...checkedDays, dayIndex];

    return newDays;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex items-center m-auto flex-col "
    >
      <h1 className="text-4xl font-bolder">Create a habit</h1>
      <div className="mt-7 mb-5">
        <div className="mb-4 mt-5 ">
          <p className="font-bold text-sm ">NAME</p>
          {errors.habitName ? (
            <p className="invalidInput mt-1" role="alert">
              {errors.habitName.message}
            </p>
          ) : (
            <p className="invalidInput hide"></p>
          )}
        </div>
        <TextField
          id="habit-name"
          type="text"
          sx={textfieldStyles}
          placeholder={"enter the habit name e.g. reading"}
          variant="outlined"
          fullWidth
          {...register("habitName")}
        />
        <div className="mb-4 mt-5 ">
          <p className="font-bold text-sm">DESCRIPTION</p>
          {errors.description ? (
            <p className="invalidInput" role="alert">
              {errors.description.message}
            </p>
          ) : (
            <p className="invalidInput hide"></p>
          )}
        </div>
        <TextField
          id="habit-description"
          type="text"
          sx={textfieldStyles}
          placeholder={"e.g. at least 10 pages"}
          variant="outlined"
          fullWidth
          {...register("description")}
        />
        <div className="mb-4 mt-5 ">
          <p className="font-bold text-sm">FREQUENCY</p>
          {errors.frequency ? (
            <p className="invalidInput" role="alert">
              {errors.frequency.message}
            </p>
          ) : (
            <p className="invalidInput hide"></p>
          )}
        </div>
        <FormControl component="fieldset" fullWidth>
          <FormGroup
            row={true}
            sx={{
              justifyContent: "space-around",
              "& .MuiFormControlLabel-root": {
                margin: "0px",
              },
            }}
          >
            <Controller
              name="frequency"
              control={control}
              render={({ field: props }) => (
                <>
                  {Object.keys(weekdaysTable).map(
                    (key: string, index: number) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              sx={checkboxStyle}
                              key={key}
                              value={index}
                              checked={getValues().frequency.includes(index)}
                              onChange={() =>
                                props.onChange(handleCheckbox(index))
                              }
                            />
                          }
                          key={key}
                          label={
                            <p className="-translate-y-9">
                              {weekdaysTable[key]}
                            </p>
                          }
                          labelPlacement="bottom"
                          sx={formControlStyle}
                        />
                      );
                    }
                  )}
                </>
              )}
            />
          </FormGroup>
        </FormControl>
        <LoadingButton
          fullWidth
          variant="contained"
          sx={{
            padding: "1.3em",
            borderRadius: "20px",
            backgroundColor: "#328C32",
            ":hover": {
              backgroundColor: "#328C32",
            },
          }}
          type="submit"
        >
          Create
        </LoadingButton>
      </div>
    </form>
  );
};

addHabitPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout
      meta={{
        title: "Habit tracker | Add habit",
        description: "Habit tracker Add Habit Subpage",
      }}
    >
      <div className="justify-center align-middle h-[calc(100vh-4rem)] flex bg-white p-3 md:pl-10 md:pr-10 rounded-3xl md:-translate-y-12 ">
        {page}
      </div>
    </DashboardLayout>
  );
};

export default addHabitPage;

const textfieldStyles = {
  backgroundColor: "#fcfbf9",
  borderRadius: "30px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    "&.Mui-focused fieldset": {
      borderColor: "rgb(46, 130, 46)",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fcfbf9",
  },
  "& .MuiInputBase-input": {
    paddingLeft: "1.7rem",
    fontSize: "14px",
  },
};

const checkboxStyle = {
  "& .MuiButtonBase-root": {
    backgroundColor: "orange",
  },
  "& .MuiCheckbox-root": {
    backgroundColor: "orange",
  },
  "& .MuiSvgIcon-root": {
    color: "transparent",
  },
};

const formControlStyle = {
  "& .MuiButtonBase-root": {
    backgroundColor: "#fcfbf9",
    padding: "12px",
  },
  "& .Mui-checked:hover": {
    backgroundColor: "#f87E3A",
  },
  "&  .Mui-checked": {
    backgroundColor: "#f87E3A",
  },
  "& .MuiTypography-root": {
    color: "black",
  },
  "& .Mui-checked + .MuiTypography-root": {
    color: "white",
  },
};

