import {
  Box,
  Button,
  ButtonGroup,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StudentAPI from "../../api/studentApi";
import { getGrade, toLocaleString } from "../../services/helpers";
import StudentModal from "./StudentModal";
import SearchIcon from "@mui/icons-material/Search";
import ConfirmCancelModal from "../common/ConfirmCancelModal";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [openStudentModel, setOpenStudentModel] = useState(false);
  const [editingStudent, setEditingStudent] = useState({});
  const [deletingStudent, setDeletingStudent] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const fetchStudents = async () => {
    const stds = await StudentAPI.getStudents();
    setStudents(stds);
  };

  const deleteStudent = async (studentId) => {
    try {
      await StudentAPI.deleteStudent(studentId);
    } catch (error) {
      console.log(error);
    }

    fetchStudents();
  };

  const editStudent = (data) => {
    setEditingStudent(data);
    setOpenStudentModel(true);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Box>
      <Box>
        <TextField
          label="Buscar alumno"
          id="outlined-start-adornment"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            setOpenStudentModel(true);
            setEditingStudent({});
          }}
          style={{ marginTop: 20 }}
        >
          Agregar alumno
        </Button>
      </Box>
      <Box mt={1}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, border: 1, boxShadow: 3 }}>
            <TableHead>
              <TableRow>
                <TableCell>DNI</TableCell>
                <TableCell>Nombres</TableCell>
                <TableCell>Apellido paterno</TableCell>
                <TableCell>Apellido materno</TableCell>
                <TableCell>Correo electrónico</TableCell>
                <TableCell>Año de estudios</TableCell>
                <TableCell>Telefono/Celular</TableCell>
                <TableCell>Pensión</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student.code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {student.code}
                  </TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.fatherSurname}</TableCell>
                  <TableCell>{student.motherSurname}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{getGrade(student.grade)}</TableCell>
                  <TableCell>{student.phoneNumber}</TableCell>
                  <TableCell>{toLocaleString(student.monthly)}</TableCell>
                  <TableCell>
                    <ButtonGroup variant="contained">
                      <Button onClick={() => editStudent(student)}>
                        Editar
                      </Button>
                      <Button
                        onClick={() => {
                          setDeletingStudent(student._id);
                          setOpenDeleteModal(true);
                        }}
                        color="error"
                      >
                        Eliminar
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {openStudentModel && (
        <StudentModal
          setOpenStudentModel={setOpenStudentModel}
          openStudentModel={openStudentModel}
          fetchStudents={fetchStudents}
          editingStudent={editingStudent}
          setEditingStudent={setEditingStudent}
        />
      )}
      {openDeleteModal && (
        <ConfirmCancelModal
          open={openDeleteModal}
          onCancel={() => {
            setOpenDeleteModal(false);
          }}
          onContinue={() => {
            deleteStudent(deletingStudent);
            setOpenDeleteModal(false);
          }}
        />
      )}
    </Box>
  );
};

export default StudentTable;
