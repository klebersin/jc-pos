import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";
import { useForm } from "react-hook-form";
import Modal from "../common/Modal";
import StudentAPI from "../../api/studentApi";
import { GRADES } from "../../constants";
import { toast } from "react-toastify";

const StudentModal = ({
  setOpenStudentModel,
  openStudentModel,
  actionAfter,
  editingStudent,
  setEditingStudent,
}) => {
  const defaultValues = {
    name: editingStudent.name || "",
    fatherSurname: editingStudent.fatherSurname || "",
    motherSurname: editingStudent.motherSurname || "",
    email: editingStudent.email || "",
    phoneNumber: editingStudent.phoneNumber || "",
    code: editingStudent.code || "",
    grade: editingStudent.grade || 1,
    tutor: editingStudent.tutor || "",
    tutorCode: editingStudent.tutorCode || "",
    address: editingStudent.address || "",
    monthly: editingStudent.monthly || "",
  };

  const { register, handleSubmit } = useForm({ defaultValues });

  const save = async (data) => {
    try {
      if (editingStudent._id) {
        await StudentAPI.editStudent(editingStudent._id, data);
        toast.success("Alumno modificado");
      } else {
        await StudentAPI.createStudent(data);
        toast.success("Alumno creado");
      }

      if (actionAfter) {
        await actionAfter();
      }
      setOpenStudentModel(false);
    } catch (err) {
      toast.error("Ups! Algo salió mal");
    }
  };

  const handleClose = () => {
    setOpenStudentModel(false);
  };
  const StudentForm = () => {
    return (
      <form onSubmit={handleSubmit(save)}>
        <Box
          p={1}
          sx={{
            display: "grid",
            columnGap: 3,
            gap: 1,
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <TextField label="DNI" variant="outlined" {...register("code")} />
          <TextField label="Nombres" variant="outlined" {...register("name")} />
          <TextField
            label="Apellido Paterno"
            variant="outlined"
            {...register("fatherSurname")}
          />
          <TextField
            label="Apellido Materno"
            variant="outlined"
            {...register("motherSurname")}
          />
          <Select defaultValue={editingStudent.grade} {...register("grade")}>
            {Object.keys(GRADES).map((key) => (
              <MenuItem value={GRADES[key].value}>{GRADES[key].label}</MenuItem>
            ))}
          </Select>

          <TextField
            label="Correo Electrónico"
            variant="outlined"
            {...register("email")}
          />
          <TextField
            label="Direccion"
            variant="outlined"
            {...register("address")}
          />
          <TextField
            label="Numero de teléfono"
            variant="outlined"
            {...register("phoneNumber")}
          />
        </Box>
        <Box
          p={1}
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: "repeat(1, 1fr)",
          }}
        >
          <TextField
            label="Apoderado del alumno"
            variant="outlined"
            {...register("tutor")}
          />
        </Box>

        <Box
          p={1}
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <TextField
            label="DNI del apoderado"
            variant="outlined"
            {...register("tutorCode")}
          />

          <TextField
            label="Pensión"
            variant="outlined"
            {...register("monthly")}
          />
        </Box>

        <Box
          p={1}
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <Button
            color="error"
            loadingPosition="start"
            startIcon={<DeleteIcon />}
            variant="contained"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            type={"submit"}
          >
            Guardar
          </Button>
        </Box>
      </form>
    );
  };
  return (
    <Modal
      open={openStudentModel}
      title={"Crear Nuevo estudiante"}
      children={<StudentForm />}
      hideCancelButton={true}
    />
  );
};

export default StudentModal;
