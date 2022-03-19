import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentAPI from "../../api/studentApi";

const StudentCard = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const loadStudent = async () => {
    await StudentAPI.getStudent(id);
  };
  useEffect(() => {
    loadStudent();
  }, [id]);

  return <Box>studentCard</Box>;
};

export default StudentCard;
