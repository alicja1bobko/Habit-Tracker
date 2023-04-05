export const headerListStyle = {
  fontWeight: "light",
  boxShadow: "none",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  ".MuiSelect-select": {
    "&:focus": { backgroundColor: "transparent" },
    fontWeight: 600,
    color: "#949494",
  },
  ".css-jd1zyo-MuiSelect-select-MuiInputBase-input-MuiInput-input": {
    padding: 0,
  },
};

export const listStyle = {
  sx: {
    "&& .Mui-selected": {
      backgroundColor: "rgba(49, 138, 49,0.4)",
      "&:hover": { backgroundColor: "rgba(49, 138, 49,0.3)" },
    },
  },
};
