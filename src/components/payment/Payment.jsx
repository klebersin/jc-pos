import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import StudentAPI from "../../api/studentApi";
import Invoice from "./Invoice";

const PaymentTable = () => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState();
  const [inputValue, setInputValue] = useState("");
  const fetchStudents = async () => {
    const stds = await StudentAPI.getStudents();
    setStudents(stds);
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <>
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
      {student && <Invoice />}
    </>
  );
};

export default PaymentTable;
