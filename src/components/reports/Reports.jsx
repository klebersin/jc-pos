import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InvoiceModal from "./InvoiceModal";
import InvoiceAPI from "../../api/paymentApi";
import { getDate } from "../../services/helpers";
import { toast } from "react-toastify";
const Reports = () => {
  const [invoices, setInvoices] = useState([]);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState({});
  const fetchInvoices = async () => {
    const invs = await InvoiceAPI.getInvoices();
    setInvoices(invs);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Codigo</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Estudiante</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Estado de envio</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice, i) => (
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
                      setCurrentInvoice(invoice);
                      setOpenInvoiceModal(true);
                    }}
                    style={{ cursor: "pointer", color: "blueviolet" }}
                  >
                    {invoice.code}
                  </Typography>
                </TableCell>
                <TableCell>{getDate(invoice.date)}</TableCell>
                <TableCell>
                  {invoice.student[0].name +
                    " " +
                    invoice.student[0].fatherSurname +
                    " " +
                    invoice.student[0].motherSurname}
                </TableCell>
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
      </TableContainer>
      {openInvoiceModal && (
        <InvoiceModal
          setOpenInvoiceModal={setOpenInvoiceModal}
          openInvoiceModal={openInvoiceModal}
          invoice={currentInvoice}
        />
      )}
    </Box>
  );
};

export default Reports;
