import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "../../components/loggedIn/types/FormValues";
import { checkboxStyle } from "../../components/styles/checkboxStyle";
import { formControlStyle } from "../../components/styles/formControlStyle";
import { textfieldStyles } from "../../components/styles/textfieldStyles";
import useAuth from "../../context/auth-context";
import { IUserData, useUser } from "../../context/user-context";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { createHabitSchema } from "../../schemas/create-habit";
import { weekdaysTable } from "../../utils/weekdays";
import { db } from "../api/firebase";
import { NextPageWithLayout } from "../_app";

const editHabitPage: NextPageWithLayout = () => {
  const [initializeHabit, setInitializeHabit] = useState<FormValues>({
    habitName: "",
    description: "",
    frequency: [],
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const userData: IUserData | null = useUser();
  const router = useRouter();

  // habitKey memoized on refresh page
  const { habitKey } = useMemo(() => {
    return router.query;
  }, [router.query]);

  useEffect(() => {
    // wait for userData to load
    if (Object.keys(userData.habits).length !== 0) {
      const habit = userData.habits[habitKey as string];
      setInitializeHabit({
        habitName: habit.name,
        description: habit.description,
        frequency: habit.frequency,
      });
      setLoading(false);
    }
  }, [userData]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<FormValues>({
    defaultValues: useMemo(() => {
      return initializeHabit;
    }, [initializeHabit]),
    resolver: yupResolver(createHabitSchema),
  });

  useEffect(() => {
    reset(initializeHabit);
  }, [initializeHabit]);

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
  }) => {
    setLoading(true);
    const habitsRef = doc(db, `users/${user?.uid}/habits/${habitKey}`);
    await updateDoc(habitsRef, {
      description: description,
      frequency: frequency,
      name: habitName,
    });
    setLoading(false);
    router.push("/manage-habits");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex items-center m-auto flex-col "
    >
      <h1 className="text-4xl font-bolder">Edit habit</h1>
      <div className="mt-7 mb-5">
        <div className="mb-4 mt-5 ">
          <p className="label">NAME</p>
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
          placeholder={initializeHabit.habitName}
          variant="outlined"
          fullWidth
          {...register("habitName")}
        />
        <div className="mb-4 mt-5 ">
          <p className="label">DESCRIPTION</p>
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
          placeholder={initializeHabit.description}
          variant="outlined"
          fullWidth
          {...register("description")}
        />
        <div className="mb-4 mt-5 ">
          <p className="label">FREQUENCY</p>
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
          Save
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
