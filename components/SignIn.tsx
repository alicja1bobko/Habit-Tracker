import { TextField } from "@material-ui/core";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInSchema } from "../schemas/logging-validation-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../context/auth-context";
import AuthList from "./AuthList";
import Link from "next/link";
import FormDivider from "./FormDivider";
import { useFirestore } from "../context/firestore-context";

type FormValues = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [login, setLogin] = useState(false);
  const {
    signIn,
    signUpWithFacebookProvider,
    signUpWithGithubProvider,
    signUpWithGoogleProvider,
    signUpAnonymously,
    error,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(signInSchema) });

  const onSubmitHandler: SubmitHandler<FormValues> = async ({
    email,
    password,
  }) => {
    login && (await signIn(email, password));
  };

  const handleOnAuthorizationProviderClick = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    event.preventDefault();
    if (id === "facebook") {
      signUpWithFacebookProvider();
    }
    if (id === "github") {
      signUpWithGithubProvider();
    }
    if (id === "google") {
      signUpWithGoogleProvider();
    }
    if (id === "guest") {
      signUpAnonymously();
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex items-center text-center">
      <div className="bg-white text-black mx-auto px-2 md:px-8 xl:px-[5rem] border rounded-lg shadow-2xl">
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="md:w-[23rem] my-8"
        >
          <h1 className="text-3xl mb-7">Sign in</h1>
          <p className="text-slate-500 mt-[1rem] mb-[2rem]">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-blue-600 font-semibold">
              Sign up
            </Link>
          </p>

          <AuthList
            text={"Sign In "}
            onAuthorizationProviderClick={handleOnAuthorizationProviderClick}
          />
          <FormDivider />

          <div className="space-y-4">
            <div>
              <TextField
                autoComplete="email"
                label={"Email"}
                placeholder="john@doe.com"
                variant="outlined"
                fullWidth
                {...register("email")}
              />
              {errors.email ? (
                <p className="invalidInput" role="alert">
                  {errors.email.message}
                </p>
              ) : (
                <p className="invalidInput hide"></p>
              )}
            </div>
            <div>
              <TextField
                type="password"
                autoComplete="current-password"
                label={"Password"}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                variant="outlined"
                fullWidth
                {...register("password")}
              />
              {errors.password ? (
                <p className="invalidInput" role="alert">
                  {errors.password.message}
                </p>
              ) : (
                <p className="invalidInput hide"></p>
              )}
              {error && (
                <p className="invalidInput" role="alert">
                  {error}
                </p>
              )}
            </div>

            <LoadingButton
              fullWidth
              variant="contained"
              className="bg-[#1976d2]"
              type="submit"
              onClick={() => setLogin(true)}
            >
              Sign in
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
