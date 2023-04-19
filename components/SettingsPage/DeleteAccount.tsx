import { Delete } from "@material-ui/icons";
import { Button } from "@mui/material";

type Props = {
  handleDeleteModal: () => void;
};

const DeleteAccount = ({ handleDeleteModal }: Props) => {
  return (
    <div className="mt-6">
      <h2 className="text-4xl font-bolder">Account</h2>
      <div className="flex justify-between">
        <div className="mb-3">
          <p className="text-lg mt-3">Delete account</p>
          <p className="text-dark-graphite">Accounts can't be recovered</p>
        </div>
        <Button
          onClick={handleDeleteModal}
          variant="contained"
          color="error"
          aria-label={"delete account"}
          sx={{
            height: "40px",
            width: "150px",
            alignSelf: "center",
            flexShrink: 0,
          }}
        >
          <Delete /> Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteAccount;
