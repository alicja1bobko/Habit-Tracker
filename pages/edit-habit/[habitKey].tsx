import LoadingButton from "@mui/lab/LoadingButton";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IUserData, useUser } from "../../context/user-context";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { weekdaysTable } from "../../utils/weekdays";
import {
  checkboxStyle,
  formControlStyle,
  FormValues,
  textfieldStyles,
} from "../add-habit";
import { NextPageWithLayout } from "../_app";

const editHabitPage: NextPageWithLayout = () => {
  const [initializeHabit, setInitializeHabit] = useState<FormValues>({
    habitName: "",
    description: "",
    frequency: [],
  });
  const [loading, setLoading] = useState(false);
  const userData: IUserData | null = useUser();
  const router = useRouter();
  const { habitKey } = router.query;

  useEffect(() => {
    if (habitKey !== undefined) {
      const habit = userData.habits[habitKey as string];
      setInitializeHabit({
        habitName: habit.name,
        description: habit.description,
        frequency: habit.frequency,
      });
    }
  }, [habitKey]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<FormValues>({
    defaultValues: initializeHabit,
  });

  const handleCheckbox = (dayIndex: number) => {
    const checkedDays = getValues().frequency;

    const newDays = checkedDays?.includes(dayIndex)
      ? checkedDays?.filter((v) => v !== dayIndex)
      : [...checkedDays, dayIndex];

    return newDays;
  };

  const onSubmitHandler: SubmitHandler<FormValues> = async ({
    habitName,
    description,
    frequency,
  }) => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex items-center m-auto flex-col "
    >
      <h1 className="text-4xl font-bolder">Edit</h1>
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
          loading={loading}
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

editHabitPage.getLayout = function getLayout(page: ReactElement) {
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

export default editHabitPage;
