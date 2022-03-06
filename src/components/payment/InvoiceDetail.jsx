import {
  Box,
  Button,
  Grid,
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
import DeleteIcon from "@mui/icons-material/Delete";
import { MONTHLY_PAYMENT_TYPES, SERVICES_TYPES } from "../../constants";
import InvoiceAPI from "../../api/paymentApi";

const InvoiceDetail = ({ items = [], setItems, student, setStudent }) => {
  const [totalAmount, setTotalAmount] = useState(0);

  const removeItem = (index) => {
    setItems([...items.filter((_, i) => i !== index)]);
  };

  useEffect(() => {
    setTotalAmount(
      items.reduce((acc, item) => {
        return acc + item.totalPrice;
      }, 0)
    );
  }, [items]);

  const currentDate = (() => {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const today = new Date();
    return today.toLocaleDateString("es-PE", options);
  })();

  const createInvoice = async () => {
    try {
      const newInvoice = {
        items,
        student: student._id,
        amount: totalAmount,
      };
      await InvoiceAPI.createInvoice(newInvoice);
      setStudent(null);
      setItems([]);
      setTotalAmount(0);
    } catch (error) {}
  };

  const getMonth = (value) => {
    return Object.keys(MONTHLY_PAYMENT_TYPES)
      .map((key) => MONTHLY_PAYMENT_TYPES[key])
      .find((el) => el.value === value).label;
  };

  return (
    <Box sx={{ p: 2, boxShadow: 4, border: "1px dashed grey" }}>
      <Typography> Fecha de factura: {currentDate} </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell align="right">Razon</TableCell>
              <TableCell align="right">Precio unitario</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Descuento</TableCell>
              <TableCell align="right">Monto del item</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell>
                  {item.type === SERVICES_TYPES.REGISTRATION.value
                    ? SERVICES_TYPES.REGISTRATION.label
                    : SERVICES_TYPES.MONTHLY_PAYMENT.label}
                </TableCell>
                <TableCell align="right">
                  {item.type !== SERVICES_TYPES.MONTHLY_PAYMENT.value
                    ? item.reason
                    : getMonth(item.reason)}
                </TableCell>
                <TableCell align="right">{item.unitPrice}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{item.discount}</TableCell>
                <TableCell align="right">{item.totalPrice}</TableCell>
                <TableCell
                  align="right"
                  onClick={() => {
                    removeItem(i);
                  }}
                >
                  <DeleteIcon color="error" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2}>
        <Grid container direction="row" justifyContent="flex-end">
          <Grid item xs={2}>
            <Typography>Monto total: {totalAmount}</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={createInvoice}
              disabled={!items.length}
            >
              Crear boleta
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default InvoiceDetail;
