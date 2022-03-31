import { CircularProgress, Modal } from "@mui/material";
import React from "react";

const LoadingScreen = () => {
  return (
    <Modal open>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none",
        }}
      >
        <CircularProgress
          style={{ outline: "none" }}
          disableShrink
          color="primary"
        />
      </div>
    </Modal>
  );
};

export default LoadingScreen;
