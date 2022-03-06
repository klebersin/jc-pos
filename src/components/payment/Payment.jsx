import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import StudentAPI from "../../api/studentApi";
import Invoice from "./Invoice";
import InvoiceDetail from "./InvoiceDetail";

const PaymentTable = () => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState();
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const fetchStudents = async () => {
    const stds = await StudentAPI.getStudents();
    setStudents(stds);
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <Box mt={3}>
      <Box m={3}>
        <Autocomplete
          value={student}
          options={students}
          getOptionLabel={(option) => option.name + " " + option.plastname}
          onChange={(e, chosenStudent) => {
            setStudent(chosenStudent);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Estudiante" />}
        />
      </Box>
      {student && (
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <InvoiceDetail
              items={items}
              setItems={setItems}
              student={student}
              setStudent={setStudent}
            />
          </Grid>
          <Grid item xs={4}>
            <Invoice items={items} setItems={setItems} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default PaymentTable;
