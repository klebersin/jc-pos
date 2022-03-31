import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { MONTHLY_PAYMENT_TYPES, SERVICES_TYPES } from "../../constants";
import { getCurrentMonth } from "../../services/helpers";

const MonthlyPayment = ({ items, setItems, student }) => {
  const [monthlyAmount, setMonthlyAmount] = useState(student.monthly);
  const [monthPayment, setMonthPayment] = useState(getCurrentMonth());

  const addItem = () => {
    setItems([
      ...items,
      {
        type: SERVICES_TYPES.MONTHLY_PAYMENT.value,
        reason: monthPayment,
        quantity: 1,
        unitPrice: parseFloat(monthlyAmount || 0),
        totalPrice: parseFloat(monthlyAmount || 0),
        discount: 0,
      },
    ]);
  };
  return (
    <Box sx={{ maxWidth: 220 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Mes de la pensión</InputLabel>
        <Select
          labelId="month"
          id="demo-simple-select"
          value={monthPayment}
          label="Mes de la pensión"
          onChange={(e) => {
            setMonthPayment(e.target.value);
          }}
        >
          {Object.keys(MONTHLY_PAYMENT_TYPES).map((key) => (
            <MenuItem value={MONTHLY_PAYMENT_TYPES[key].value}>
              {MONTHLY_PAYMENT_TYPES[key].label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={2}>
        <FormControl fullWidth>
          <TextField
            label="Monto"
            defaultValue={student.monthly}
            value={monthlyAmount}
            onChange={(e) => {
              setMonthlyAmount(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">S/</InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Box>
      <Box mt={2}>
        <FormControl fullWidth>
          <Button variant="contained" onClick={addItem}>
            Agregar item
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default MonthlyPayment;
