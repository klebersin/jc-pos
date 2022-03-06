import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";
import { useForm } from "react-hook-form";
import Modal from "../common/Modal";
import StudentAPI from "../../api/studentApi";

const StudentModal = ({
  setOpenStudentModel,
  openStudentModel,
  fetchStudents,
  editingStudent,
  setEditingStudent,
}) => {
  const defaultValues = {
    name: editingStudent.name || "",
    plastname: editingStudent.plastname || "",
    mlastname: editingStudent.mlastname || "",
    code: editingStudent.code || "",
    grade: editingStudent.grade || "",
    fatherNames: editingStudent.fatherNames || "",
    motherNames: editingStudent.motherNames || "",
    address: editingStudent.address || "",
  };

  const { register, handleSubmit } = useForm({ defaultValues });

  const save = async (data) => {
    try {
      if (editingStudent._id) {
        const student = await StudentAPI.editStudent(editingStudent._id, data);
        console.log(student);
      } else {
        const student = await StudentAPI.createStudent(data);
        console.log(student);
      }

      await fetchStudents();
      setOpenStudentModel(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClose = () => {
    setEditingStudent({});
    setOpenStudentModel(false);
  };
  const StudentForm = () => {
    return (
      <form onSubmit={handleSubmit(save)}>
        <TextField label="Nombres" variant="outlined" {...register("name")} />
        <br />
        <TextField
          label="Apellido Paterno"
          variant="outlined"
          {...register("plastname")}
        />
        <br />
        <TextField
          label="Apellido Materno"
          variant="outlined"
          {...register("mlastname")}
        />
        <br />
        <TextField label="DNI" variant="outlined" {...register("code")} />
        <br />
        <TextField
          label="Año de estudios"
          variant="outlined"
          {...register("grade")}
        />
        <br />
        <TextField
          label="Nombre completo de la madre"
          variant="outlined"
          {...register("fatherNames")}
        />
        <br />
        <TextField
          label="Nombre completo del padre"
          variant="outlined"
          {...register("motherNames")}
        />
        <br />
        <TextField
          label="Direccion"
          variant="outlined"
          {...register("address")}
        />
        <br />
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
