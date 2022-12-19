import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { mdiIncognito } from "@mdi/js";
import Icon from "@mdi/react";

const authData = [
  {
    id: "facebook",
    color: "#1976D2",
    icon: <FacebookRoundedIcon />,
    name: "Facebook",
  },
  {
    id: "github",
    color: "#000000",
    icon: <GitHubIcon />,
    name: "GitHub",
  },
  {
    id: "google",
    color: "#de5246",
    icon: <GoogleIcon />,
    name: "Google",
  },
  {
    id: "guest",
    color: "#64748B",
    icon: <Icon path={mdiIncognito} title="guest" size={0.9} />,
    name: "guest",
  },
];

export default authData;
