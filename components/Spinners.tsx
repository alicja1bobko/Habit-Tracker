import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

export const FullPageSpinner = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="success" size={150} />
    </Box>
  );
};

export const SmallSpinner = () => {
  return (
    <Box
      sx={{
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="success" size={70} />
    </Box>
  );
};
