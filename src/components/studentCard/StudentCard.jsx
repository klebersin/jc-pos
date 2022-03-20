import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import StudentAPI from "../../api/studentApi";
import { getDate, getGrade, toLocaleString } from "../../services/helpers";
import LoadingScreen from "../common/LoadingScreen";
import StudentModal from "../student/StudentModal";

const StudentCard = () => {
  const { id } = useParams();
  const [student, setStudent] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loadStudent = useCallback(async () => {
    try {
      setIsLoading(true);
      const std = await StudentAPI.getStudent(id);
      setStudent(std);
    } catch (error) {
      toast.error("Algo Salio mal");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadStudent();
  }, [loadStudent]);

  const StudentInvoices = () => {
    return (
      <Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Codigo</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Estado de envio</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {student?.invoices?.map((invoice, i) => (
              <TableRow
                key={i + 1}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell>
                  <Typography
                    onClick={() => {
                      /*setCurrentInvoice(invoice);
                      setOpenInvoiceModal(true);*/
                    }}
                    style={{ cursor: "pointer", color: "blueviolet" }}
                  >
                    {invoice.code}
                  </Typography>
                </TableCell>
                <TableCell>{getDate(invoice.date)}</TableCell>
                <TableCell>S/. {invoice.amount}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>{invoice.sent ? "Enviado" : "No enviado"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => {
                      toast.warning("Comming soon");
                    }}
                  >
                    Enviar a SUNAT
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  };

  const StudentGeneral = () => {
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Código: {student.code || ""}
          </Typography>
          <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
            {`${student.name} ${student.fatherSurname} ${student.motherSurname}` ||
              ""}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {getGrade(student.grade || "")}
          </Typography>
          <Typography sx={{ mb: 1.5 }} variant="body2">
            Correo Electronico: {student.email || ""}
          </Typography>
          <Typography sx={{ mb: 1.5 }} variant="body2">
            Número telefónico:{student.phoneNumber || ""}
          </Typography>
          <Typography sx={{ mb: 1.5 }} variant="body2">
            Pensión: {toLocaleString(student.monthly) || ""}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="small"
            onClick={() => setOpenModal(true)}
          >
            Editar estudiante
          </Button>
        </CardActions>
      </Card>
    );
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      {student && (
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <StudentGeneral />
          </Grid>
          <Grid item md={6} xs={12}>
            <StudentInvoices />
          </Grid>
          {openModal && (
            <StudentModal
              setOpenStudentModel={setOpenModal}
              openStudentModel={openModal}
              actionAfter={loadStudent}
              editingStudent={student}
              setEditingStudent={setStudent}
            />
          )}
        </Grid>
      )}
    </>
  );
};

export default StudentCard;
