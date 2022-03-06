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
import { SERVICES_TYPES, YEAR_OPTIONS } from "../../constants";

const Registration = ({ items, setItems }) => {
  const [registrationYear, setRegistrationYear] = useState(
    new Date().getFullYear()
  );
  const [registrationAmount, setRegistrationAmount] = useState();

  const handleChange = (event) => {
    setRegistrationYear(event.target.value);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        type: SERVICES_TYPES.REGISTRATION.value,
        reason: registrationYear,
        quantity: 1,
        unitPrice: parseFloat(registrationAmount || 0),
        totalPrice: parseFloat(registrationAmount || 0),
        discount: 0,
      },
    ]);
  };

  return (
    <Box sx={{ maxWidth: 220 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Año de matricula</InputLabel>
        <Select
          labelId="year"
          id="demo-simple-select"
          value={registrationYear}
          label="Año de matricula"
          onChange={handleChange}
        >
          {Object.keys(YEAR_OPTIONS).map((option) => (
            <MenuItem value={YEAR_OPTIONS[option]}>
              {YEAR_OPTIONS[option]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box mt={2}>
        <FormControl fullWidth>
          <TextField
            label="Monto"
            value={registrationAmount}
            onChange={(e) => {
              setRegistrationAmount(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">S/.</InputAdornment>
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

export default Registration;
