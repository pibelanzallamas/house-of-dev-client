import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

function UserEditConfirmationModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="user-edit-confirmation-modal"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "16px",
          outline: "none",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        }}
      >
        <p>¿Desea confirmar la modificación de los datos del usuario?</p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default UserEditConfirmationModal;
