import React from "react";
import authData from "../utils/auth-data";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core";

type AuthProps = {
  text: string;
  onAuthorizationProviderClick: Function;
};

const useStyles = makeStyles(() => ({
  icon: {
    padding: "5px 15px 5px 10px",
  },
}));

const AuthList = ({
  text,
  onAuthorizationProviderClick,
}: AuthProps): React.ReactElement => {
  const buttons = authData.map(({ id, name, color, icon }) => {
    const classes = useStyles();
    return (
      <Button
        classes={{
          startIcon: classes.icon,
        }}
        sx={{
          color: color,
          justifyContent: "flex-start",
          textTransform: "none",
          borderColor: color,
        }}
        variant="outlined"
        key={id}
        startIcon={icon}
        onClick={(event) => onAuthorizationProviderClick(event, id)}
        fullWidth
      >
        {text} {name}
      </Button>
    );
  });
  return <div className="space-y-3 mb-5 ">{buttons}</div>;
};

export default AuthList;
