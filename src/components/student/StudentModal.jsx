import { Button, MenuItem, Select, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";
import { useForm } from "react-hook-form";
import Modal from "../common/Modal";
import StudentAPI from "../../api/studentApi";
import { GRADES } from "../../constants";

const StudentModal = ({
  setOpenStudentModel,
  openStudentModel,
  fetchStudents,
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
        <TextField label="DNI" variant="outlined" {...register("code")} />
        <TextField label="Nombres" variant="outlined" {...register("name")} />
        <br />
        <br />
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
        <br />
        <br />

        <Select {...register("grade")} style={{ width: 250 }}>
          {Object.keys(GRADES).map((key) => (
            <MenuItem value={GRADES[key].value}>{GRADES[key].label}</MenuItem>
          ))}
        </Select>

        <TextField
          label="Correo Electrónico"
          variant="outlined"
          {...register("email")}
        />
        <br />
        <br />
        <TextField
          label="Numero de teléfono"
          variant="outlined"
          {...register("phoneNumber")}
        />
        <TextField
          label="Direccion"
          variant="outlined"
          {...register("address")}
        />
        <br />
        <br />
        <TextField
          label="Apoderado del alumno"
          variant="outlined"
          {...register("tutor")}
        />
        <TextField
          label="DNI del apoderado"
          variant="outlined"
          {...register("tutorCode")}
        />
        <br />

        <br />
        <TextField
          label="Pensión"
          variant="outlined"
          {...register("monthly")}
        />
        <br />
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
