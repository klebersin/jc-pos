import React from "react";
import Modal from "./Modal";

const ConfirmCancelModal = ({
  open = true,
  text = "Estas seguro que quieres continuar?",
  title = "Confirmar",
  onContinue,
  onCancel,
}) => {
  const Content = () => {
    return <div>{text}</div>;
  };
  return (
    <Modal
      open={open}
      title={title}
      children={<Content />}
      onCancel={onCancel}
      actions={[{ label: "Confirmar", onConfirm: onContinue }]}
    />
  );
};

export default ConfirmCancelModal;
