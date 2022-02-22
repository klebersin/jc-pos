import { Button, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm } from "react-hook-form";
import React from "react";
import {useNavigate} from "react-router-dom";
import StudentApi from "../../api/studentApi";
const StudentForm = () => {
    const { register, handleSubmit} = useForm();
    const myData = async data => {
        try{
            await StudentApi.createStudent(data);
        }catch (err){
            console.log(err.message);
        }
    }
    const navigate = useNavigate();
    const goToPayment = () =>{
        navigate("/payments/new")
    }

    return (
        <>
            <form onSubmit={handleSubmit(myData)}>
                <TextField
                    label="Nombres"
                    variant="outlined"
                    {...register("name")}
                />
                <br />
                <TextField
                    label="Apellido Paterno"
                    variant="outlined"
                    {...register("plastname")}
                />
                <br />
                <TextField
                    label="Apellido Materno"
                    variant="outlined"
                    {...register("mlastname")}
                />
                <br />
                <TextField
                    label="DNI"
                    variant="outlined"
                    {...register("code")}
                />
                <br />
                <TextField
                    label="Año de estudios"
                    variant="outlined"
                    {...register("grade")}
                />
                <br />
                <TextField
                    label="Nombre completo de la madre"
                    variant="outlined"
                    {...register("fatherNames")}
                />
                <br />
                <TextField
                    label="Nombre completo del padre"
                    variant="outlined"
                    {...register("motherNames")}
                />
                <br />
                <TextField
                    label="Direccion"
                    variant="outlined"
                    {...register("address")}
                />
                <br />
                <Button
                    color="error"
                    loadingPosition="start"
                    startIcon={<DeleteIcon />}
                    variant="contained"
                >
                    Cancelar
                </Button>
                <Button
                    color="primary"
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    type={"submit"}
                >
                    Guardar
                </Button>
                <Button
                    color="primary"
                    loadingPosition="start"
                    onClick={goToPayment}
                    variant="contained"
                >
                    Guardar
                </Button>
            </form>
        </>
    );
}

export default StudentForm;
