import {
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StudentAPI from "../../api/studentApi";
import { getGrade } from "../../services/helpers";
import StudentModal from "./StudentModal";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [openStudentModel, setOpenStudentModel] = useState(false);
  const [editingStudent, setEditingStudent] = useState({});

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
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>DNI</TableCell>
              <TableCell>Nombres</TableCell>
              <TableCell>Apellido paterno</TableCell>
              <TableCell>Apellido materno</TableCell>
              <TableCell>Año de estudios</TableCell>
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
                <TableCell>{student.plastname}</TableCell>
                <TableCell>{student.mlastname}</TableCell>
                <TableCell>{getGrade(student.grade)}</TableCell>
                <TableCell>
                  <ButtonGroup variant="contained">
                    <Button onClick={() => editStudent(student)}>Editar</Button>
                    <Button
                      onClick={() => deleteStudent(student._id)}
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
      <Button
        variant="contained"
        onClick={() => {
          setOpenStudentModel(true);
          setEditingStudent({});
        }}
      >
        Agregar alumno
      </Button>
      {openStudentModel && (
        <StudentModal
          setOpenStudentModel={setOpenStudentModel}
          openStudentModel={openStudentModel}
          fetchStudents={fetchStudents}
          editingStudent={editingStudent}
          setEditingStudent={setEditingStudent}
        />
      )}
    </>
  );
};

export default StudentTable;
