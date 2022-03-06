import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

const Modal = ({
  open,
  title = "Dialog",
  onCancel,
  cancelLabel = "Cancelar",
  children,
  maxWidth = "sm",
  hideCancelButton,
  actions = [],
}) => {
  const RenderActions = () => {
    const buttons = [];
    if (!hideCancelButton) {
      buttons.push(<Button onClick={onCancel}>{cancelLabel}</Button>);
    }
    if (actions.length) {
      actions.forEach((action) => {
        buttons.push(
          <Button key={action.label} onClick={action.onConfirm}>
            {action.label}
          </Button>
        );
      });
    }
    return buttons;
  };
  return (
    <Dialog open={open} onClose={onCancel} maxWidth={maxWidth}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <RenderActions />
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
