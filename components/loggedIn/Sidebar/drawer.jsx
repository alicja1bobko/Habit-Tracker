import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MuiListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    backgroundColor: "#fcfbf9",
  },
}));

const ListItem = withStyles({
  root: {
    "& .MuiListItemText-primary": {
      fontWeight: "bold",
      color: "#b9b8b8",
    },
    "& .css-cveggr-MuiListItemIcon-root": {
      minWidth: "40px",
      color: "#b9b8b8",
    },

    "&$selected": {
      color: "black",
      backgroundColor: "transparent",
      "& .MuiListItemIcon-root": {
        color: "black",
      },
      "& .MuiListItemText-primary": {
        fontWeight: "bold",
        color: "black",
      },
    },
    "&$selected:hover": {
      color: "black",
      backgroundColor: "transparent",
      "& .MuiListItemIcon-root": {
        color: "black",
      },
    },
  },
  selected: {},
})(MuiListItem);

const DrawerListItem = ({
  icon,
  destination,
  children,
  selected,
  handleListItemClick,
  index,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link href={destination}>
        <ListItem
          selected={selected}
          onClick={() => handleListItemClick(index)}
        >
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{children}</ListItemText>
          </ListItemButton>
        </ListItem>
      </Link>
    </div>
  );
};

const DrawerButton = ({
  icon,
  children,
  selected,
  handleListItemClick,
  index,
}) => {
  return (
    <ListItem selected={selected} onClick={() => handleListItemClick(index)}>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{children}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export { DrawerListItem, DrawerButton };
