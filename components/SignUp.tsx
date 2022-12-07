import { TextField } from "@material-ui/core";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
import React from "react";
import { useForm, Resolver } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  passwordConfirmation: yup.string().min(8).max(32).required(),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data: any) => {
    console.log(data);
  };

  return (
    <div className="bg-white text-black flex flex-col items-center justify-center text-center  mt-[5rem] max-w-[35rem] mx-auto border rounded-lg shadow-2xl">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="max-w-[25rem] my-10"
      >
        <h1 className="text-3xl">Sign up</h1>
        <p className="text-slate-500 my-[1rem]">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-600 font-semibold">
            Sign in
          </Link>
        </p>
        <div className="space-y-4">
          <TextField
            autoComplete="email"
            label={"Email"}
            placeholder="john@doe.com"
            variant="outlined"
            fullWidth
            {...register("email")}
          />

          <TextField
            type="password"
            autoComplete="current-password"
            label={"Password"}
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            variant="outlined"
            fullWidth
            {...register("password")}
          />
          <TextField
            type="password"
            autoComplete="repeat-password"
            label={"Confirm password"}
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            variant="outlined"
            fullWidth
            {...register("passwordConfirmation")}
          />
          <LoadingButton fullWidth variant="contained" className="bg-[#1976d2]">
            Sign up
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
