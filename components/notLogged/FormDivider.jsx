import React from "react";
import { Divider } from "@material-ui/core";

const FormDivider = () => {
  return (
    <div className="flex mb-7">
      <Divider className="flex-1 self-center" />

      <span className="text-slate-500 flex-1 text-xs mx-[-2rem]">OR</span>

      <Divider className="flex-1 self-center" />
    </div>
  );
};

export default FormDivider;
