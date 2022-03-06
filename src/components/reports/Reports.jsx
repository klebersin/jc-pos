import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InvoiceAPI from "../../api/paymentApi";

const Reports = () => {
  const [invoices, setInvoices] = useState([]);
  const fetchInvoices = async () => {
    const invs = await InvoiceAPI.getInvoices();
    setInvoices(invs);
  };
  const getDate = (date) => {
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const today = new Date(date);
    return today.toLocaleDateString("es-PE", options);
  };
  useEffect(() => {
    fetchInvoices();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Codigo</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Estudiante</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Monto</TableCell>
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
              <TableCell>{invoice.code}</TableCell>
              <TableCell>{getDate(invoice.date)}</TableCell>
              <TableCell>
                {invoice.student[0].name +
                  " " +
                  invoice.student[0].plastname +
                  " " +
                  invoice.student[0].mlastname}
              </TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>{invoice.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Reports;
