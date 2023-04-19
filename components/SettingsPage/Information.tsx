import { SubmitHandler, useForm } from "react-hook-form";
import { Settings } from "../../pages/settings";
import { doc, updateDoc } from "firebase/firestore";
import { IUserData, useUser } from "../../context/user-context";
import useAuth from "../../context/auth-context";
import { db } from "../../pages/api/firebase";
import { useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { settingsSchema } from "../../schemas/settings-validation";
import { Button, TextField } from "@mui/material";
import { textfieldStyles } from "../styles/textfieldStyles";

type Props = {
  initializeSettings: Settings;
};

const Information = ({ initializeSettings }: Props) => {
  const { user } = useAuth();
  const userData: IUserData | null = useUser();
  const settingsKey = Object.keys(userData.settings)[0];
  const settingsRef = doc(db, `users/${user?.uid}/settings/${settingsKey}`);

  const onSubmitInformationHandler: SubmitHandler<Settings> = async ({
    firstName,
    lastName,
    password,
    email,
  }) => {
    await updateDoc(settingsRef, {
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
    });
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Settings>({
    defaultValues: useMemo(() => {
      return initializeSettings;
    }, [initializeSettings]),
    resolver: yupResolver(settingsSchema),
  });

  useEffect(() => {
    reset(initializeSettings);
  }, [initializeSettings]);

  return (
    <form
      onSubmit={handleSubmit(onSubmitInformationHandler)}
      className="mt-5 mb-10 lg:mt-10"
    >
      <h2 className="text-4xl font-bolder">Information</h2>
      <div className="grid mt-5 gap-5 md:grid-cols-2  md:gap-5 md:mt-5 lg:mt-10">
        <div>
          <p className="label mb-2">FIRST NAME</p>
          <TextField
            id="first-name"
            type="text"
            sx={textfieldStyles}
            placeholder={initializeSettings.firstName}
            variant="outlined"
            fullWidth
            {...register("firstName")}
          />
          {errors.firstName ? (
            <p className="invalidInput mt-1" role="alert">
              {errors.firstName.message}
            </p>
          ) : (
            <p className="invalidInput hide"></p>
          )}
        </div>
        <div>
          <p className="label mb-2">LAST NAME</p>
          <TextField
            id="last-name"
            type="text"
            sx={textfieldStyles}
            placeholder={initializeSettings.lastName}
            variant="outlined"
            fullWidth
            {...register("lastName")}
          />
          {errors.lastName ? (
            <p className="invalidInput mt-1" role="alert">
              {errors.lastName.message}
            </p>
          ) : (
            <p className="invalidInput hide"></p>
          )}
        </div>
        <div>
          <p className="label mb-2">PASSWORD</p>
          <TextField
            id="password"
            type="password"
            sx={textfieldStyles}
            placeholder={initializeSettings.password}
            variant="outlined"
            fullWidth
            {...register("password")}
          />
          {errors.password ? (
            <p className="invalidInput mt-1 mb-2" role="alert">
              {errors.password.message}
            </p>
          ) : (
            <p className="invalidInput hide"></p>
          )}
        </div>
        <div>
          <p className="label mb-2">EMAIL</p>
          <TextField
            id="email"
            type="email"
            sx={textfieldStyles}
            placeholder={initializeSettings.email}
            variant="outlined"
            fullWidth
            {...register("email")}
          />
          {errors.email ? (
            <p className="invalidInput mt-1" role="alert">
              {errors.email.message}
            </p>
          ) : (
            <p className="invalidInput hide"></p>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          variant="contained"
          aria-label={"save settings"}
          sx={{
            height: "40px",
            width: "150px",
            marginTop: "2em",
            padding: "1.3em",
            backgroundColor: "#328C32",
            ":hover": {
              backgroundColor: "#2d7e2d",
            },
          }}
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default Information;
