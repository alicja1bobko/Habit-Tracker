import { TextField } from "@material-ui/core";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signUpSchema } from "../schemas/logging-validation-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../hooks/useAuth";

type FormValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const SignUp = () => {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();
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

  return (
    <div className="bg-white text-black flex flex-col items-center justify-center text-center  mt-[5rem] max-w-[35rem] mx-auto border rounded-lg shadow-2xl">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-[22rem] my-10"
      >
        <h1 className="text-3xl">Sign up</h1>
        <p className="text-slate-500 my-[1rem]">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-600 font-semibold">
            Sign in
          </Link>
        </p>
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
            className="bg-[#1976d2]"
            type="submit"
            onClick={() => setLogin(true)}
          >
            Sign up
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
