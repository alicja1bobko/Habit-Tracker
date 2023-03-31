import { TextField } from "@material-ui/core";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
import React, { useState } from "react";
import FormDivider from "./FormDivider";
import { useForm, SubmitHandler } from "react-hook-form";
import { signUpSchema } from "../../schemas/logging-validation-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../context/auth-context";
import AuthList from "./AuthList";

type FormValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const SignUp = () => {
  const [login, setLogin] = useState(false);
  const {
    signUp,
    signUpWithFacebookProvider,
    signUpWithGithubProvider,
    signUpWithGoogleProvider,
    signUpAnonymously,
  } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(signUpSchema) });

  const onSubmitHandler: SubmitHandler<FormValues> = async ({
    email,
    password,
  }) => {
    login && (await signUp(email, password));
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
    <div className="sm:h-[calc(100vh-2rem)] xl:h-[calc(100vh-7rem)] flex items-center text-center">
      <div className="bg-white text-black mx-auto px-2 md:px-8 xl:px-[5rem] border rounded-lg shadow-2xl">
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="md:w-[23rem] my-8"
        >
          <h1 className="text-3xl">Sign up</h1>
          <p className="text-slate-500 mt-[1rem] mb-[1rem]">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-600 font-semibold">
              Sign in
            </Link>
          </p>

          <AuthList
            text={"Sign Up"}
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
            </div>
            <div>
              <TextField
                type="password"
                autoComplete="repeat-password"
                label={"Confirm password"}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                variant="outlined"
                fullWidth
                {...register("passwordConfirmation")}
              />
              {errors.passwordConfirmation ? (
                <p className="invalidInput" role="alert">
                  {errors.passwordConfirmation.message}
                </p>
              ) : (
                <p className="invalidInput hide"></p>
              )}
            </div>

            <LoadingButton
              fullWidth
              variant="contained"
              className="bg-light-blue"
              type="submit"
              onClick={() => setLogin(true)}
            >
              Sign up
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
