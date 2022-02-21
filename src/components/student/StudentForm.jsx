import { Button, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

function StudentForm() {
  return (
    <>
      <TextField label="Nombres" variant="outlined" />
      <br />
      <TextField label="Apellido Materno" variant="outlined" />
      <br />
      <TextField label="Apellido Paterno" variant="outlined" />
      <br />
      <TextField label="DNI" variant="outlined" />
      <br />
      <TextField label="Año de estudios" variant="outlined" />
      <br />
      <TextField label="Nombre completo de la madre" variant="outlined" />
      <br />
      <TextField label="Nombre completo del padre" variant="outlined" />
      <br />
      <TextField label="Direccion" variant="outlined" />
      <br />
      <Button
        color="error"
        loadingPosition="start"
        startIcon={<DeleteIcon />}
        variant="contained"
      >
        Cancelar
      </Button>
      <Button
        color="primary"
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
      >
        Guardar
      </Button>
    </>
  );
}

export default StudentForm();
