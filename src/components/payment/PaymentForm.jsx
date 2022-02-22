import React from 'react'
import {Button, FormControl, InputLabel, Select, TextField} from "@mui/material";
import{ useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

const PaymentForm = () => {
    const { register, handleSubmit } = useForm();
    const myData = data => console.log(data)

    return (
        <>
            <form onSubmit={handleSubmit(myData)}>
                <TextField
                    label="Código"
                    variant={"outlined"}
                    {...register("code")}
                />
                <TextField
                    label="Motivo"
                    variant={"outlined"}
                    {...register("reason")}
                />
                <TextField
                    label="´Código Alumno"
                    variant={"outlined"}
                    {...register("codeStudent")}
                />
                <TextField
                    label="´Monto"
                    variant={"outlined"}
                    {...register("amount")}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Método Pago</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Método Pago"
                        {...register("method")}
                    >
                        <MenuItem value={10}>Efectivo</MenuItem>
                        <MenuItem value={20}>Depósito</MenuItem>
                        <MenuItem value={30}>Otros</MenuItem>
                    </Select>
                </FormControl>
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
            </form>
        </>
    )
}

export default PaymentForm;
