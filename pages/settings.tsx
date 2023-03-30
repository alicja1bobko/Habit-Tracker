import { yupResolver } from "@hookform/resolvers/yup";
import { Delete } from "@material-ui/icons";
import { Button, TextField } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "../components/loggedIn/Modal";
import useAuth from "../context/auth-context";
import { IUserData, useUser } from "../context/user-context";
import DashboardLayout from "../Layouts/DashboardLayout";
import { settingsSchema } from "../schemas/settings-validation";
import { textfieldStyles } from "./add-habit";
import { db } from "./api/firebase";
import { NextPageWithLayout } from "./_app";

type Settings = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  image: string;
};

const settingsPage: NextPageWithLayout = () => {
  const { user, deleteAccount } = useAuth();
  const userData: IUserData | null = useUser();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initializeSettings, setInitializeSettings] = useState<Settings>({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    // wait for userData to load
    if (Object.keys(userData.settings).length !== 0) {
      let settingsKey = Object.keys(userData.settings)[0];
      const settings = userData.settings[settingsKey];
      setInitializeSettings({
        firstName: settings.firstName,
        lastName: settings.lastName,
        password: settings.password,
        email: settings.email,
        image: settings.image,
      });
      setLoading(false);
    }
  }, [userData]);

  const onSubmitHandler: SubmitHandler<Settings> = async ({
    firstName,
    lastName,
    password,
    email,
    image,
  }) => {
    console.log(firstName, lastName, password, email, image);
    let settingsKey = Object.keys(userData.settings)[0];

    const settingsRef = doc(db, `users/${user?.uid}/settings/${settingsKey}`);
    await updateDoc(settingsRef, {
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
      image: image,
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

  const handleDeleteModal = () => {
    setOpen(true);
  };

  const deleteAcc = async () => {
    try {
      await deleteAccount();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="p-3 md:p-0 m-auto lg:w-1/2">
        <h2 className="text-4xl font-bolder">Profile</h2>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="">
          <div className="grid mt-5 gap-5 md:grid-cols-2  md:gap-5 md:mt-5 lg:mt-10">
            <div>
              <p className="font-semibold text-sm mb-2">FIRST NAME</p>
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
              <p className="font-semibold text-sm mb-2">LAST NAME</p>
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
              <p className="font-semibold text-sm mb-2">PASSWORD</p>

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
              <p className="font-semibold text-sm mb-2">EMAIL</p>
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
            <div>
              <p className="font-semibold text-sm mb-2">IMAGE</p>
              <TextField
                id="image"
                type="text"
                sx={textfieldStyles}
                placeholder={initializeSettings.image}
                variant="outlined"
                fullWidth
                {...register("image")}
              />
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
                  backgroundColor: "#328C32",
                },
              }}
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <h2 className="text-4xl font-bolder">Account</h2>
          <div className="flex justify-between">
            <div className="mb-3">
              <p className="text-lg mt-3">Delete account</p>
              <p className="text-[#949494]">Accounts can't be recovered</p>
            </div>
            <Button
              onClick={handleDeleteModal}
              variant="contained"
              color="error"
              aria-label={"delete account"}
              sx={{
                height: "40px",
                width: "150px",
                alignSelf: "center",
                flexShrink: 0,
              }}
            >
              <Delete /> Delete
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        dialog={{
          title: "Delete account?",
          description:
            "Deleted accounts can't be recovered. All data associated with your account will be deleted.",
          confirmText: "Delete account",
          onConfirm: async () => {
            deleteAcc();
          },
        }}
      />
    </>
  );
};

settingsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout
      meta={{
        title: "Habit tracker | Settings",
        description: "Habit tracker Settings",
      }}
    >
      <div className="w-full justify-center p-3 md:flex md:flex-column min-h-[calc(100vh-4rem)] md:pt-8 md:pb-8 bg-white rounded-3xl md:-translate-y-12">
        {page}
      </div>
    </DashboardLayout>
  );
};

export default settingsPage;
