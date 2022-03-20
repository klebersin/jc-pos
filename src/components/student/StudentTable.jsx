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
  TableFooter,
  TablePagination,
  TableHead,
  TableRow,
  TextField,
  useTheme,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import React, { useCallback, useEffect, useState } from "react";
import StudentAPI from "../../api/studentApi";
import { getGrade, toLocaleString } from "../../services/helpers";
import StudentModal from "./StudentModal";
import SearchIcon from "@mui/icons-material/Search";
import ConfirmCancelModal from "../common/ConfirmCancelModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../common/LoadingScreen";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [openStudentModel, setOpenStudentModel] = useState(false);
  const [editingStudent, setEditingStudent] = useState({});
  const [deletingStudent, setDeletingStudent] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalStudents, setTotalStudents] = React.useState(0);
  const [filterStudents, setFilterStudents] = React.useState(null);

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchStudents = useCallback(async () => {
    try {
      setIsLoading(true);
      const stds = await StudentAPI.getStudents(
        page,
        rowsPerPage,
        filterStudents
      );
      setStudents(stds.items);
      setTotalStudents(stds.count);
    } catch (error) {
      toast.error("Algo salió mal");
    } finally {
      setIsLoading(false);
    }
  }, [page, rowsPerPage, filterStudents]);

  const deleteStudent = async (studentId) => {
    try {
      const student = await StudentAPI.deleteStudent(studentId);
      toast.success(`Estudiante ${student.name} eliminado`);
    } catch (error) {
      toast.error(`Algo salió mal`);
      console.log(error);
    }
    fetchStudents();
  };

  const goToStudentCard = (studentId) => {
    navigate(`student/${studentId}`);
  };

  const editStudent = (data) => {
    setEditingStudent(data);
    setOpenStudentModel(true);
  };

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <Box>
      {isLoading && <LoadingScreen />}

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
          onBlur={(event) => {
            setFilterStudents(event.target.value);
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
                  <TableCell
                    onClick={() => {
                      goToStudentCard(student._id);
                    }}
                    style={{ cursor: "pointer", color: "blueviolet" }}
                  >
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
                      <Button
                        onClick={() => {
                          editStudent(student);
                        }}
                      >
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
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={9}
                  count={totalStudents}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
      {openStudentModel && (
        <StudentModal
          setOpenStudentModel={setOpenStudentModel}
          openStudentModel={openStudentModel}
          actionAfter={fetchStudents}
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
