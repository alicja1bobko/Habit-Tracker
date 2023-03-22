import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialog: {
    title: string;
    description: string;
    confirmText: string;
    onConfirm: () => void;
  };
};

export const Modal = ({ open, setOpen, dialog }: Props) => {
  const handleDeleteButtonOnClose = () => {
    setOpen(false);
  };

  const { title, description, confirmText, onConfirm } = dialog;

  return (
    <Dialog
      open={open}
      onClose={() => handleDeleteButtonOnClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleDeleteButtonOnClose()}>Cancel</Button>
        <Button onClick={() => handleDeleteButtonOnClose()} autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
