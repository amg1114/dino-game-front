import { useState, useEffect } from "react"
import axios from "axios"
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { InputFilledStyle } from "../../../utils/mui.styles"
import "./InfoUser.css"
import { useAuth } from "../../../providers/AuthProvider"
import Swal from "sweetalert2"

export function InfoUser() {

    const { usuario } = useAuth()

    const [validacion, setValidacion] = useState(true)
    const [datos, setDatos] = useState({
        nombre: '',
        fechaNacimiento: '',
        correo: '',
        pais: '',
        sexo: ''
    });
    const [datosOriginales, setDatosOriginales] = useState(usuario);

    useEffect(() => {
        if (usuario) {
            setDatos(usuario)
            setDatosOriginales(usuario)
            setValidacion(false)
        }
    }, [usuario]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDatos(prevDatos => ({ ...prevDatos, [name]: value }));
    };

    const handleActualizar = (event) => {
        event.preventDefault();

        axios.patch((process.env.REACT_APP_API + "/users/" + usuario.id), datos)
            .then((respuesta) => {
                console.log(respuesta.data)
                Swal.fire({
                    icon: "success",
                    title: "Actualizado Correctamente",
                    text: "El usuario ha sido actualizado correctamente"
                })
            })
            .catch((error) => {
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Error al Actualizar los datos",
                    text: error.response.data.message
                })
            })
        console.log('Datos enviados:', datos);
    };

    const handleDescartar = (event) => {
        event.preventDefault();
        setDatos(datosOriginales);
    };
    return <>
        {validacion ? <></> : (
            <>
                <h2>INFORMACION PERSONAL</h2>
                <form className="form">

                    <div className="field-wrapper full-width">
                        <TextField
                            id="nombre"
                            name="nombre"
                            label="Nombre"
                            value={datos.nombre}
                            onChange={handleChange}
                            sx={InputFilledStyle}
                            variant="filled"
                            fullWidth
                        />
                    </div>

                    <div className="field-wrapper full-width">
                        <TextField
                            id="fecha"
                            label='Fecha de Nacimiento'
                            name="fechaNacimiento"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={datos.fechaNacimiento}
                            onChange={handleChange}
                            sx={InputFilledStyle}
                            variant="filled"
                            fullWidth
                        />
                    </div>

                    <div className="field-wrapper full-width">
                        <TextField
                            id="correo"
                            label='Correo electronico'
                            name="correo"
                            value={datos.correo}
                            onChange={handleChange}
                            sx={InputFilledStyle}
                            variant="filled"
                            fullWidth
                        />
                    </div>

                    <div className="field-wrapper full-width">
                        <TextField
                            id="pais"
                            label="Pais"
                            name="pais"
                            value={datos.pais}
                            onChange={handleChange}
                            sx={InputFilledStyle}
                            variant="filled"
                            fullWidth
                        />
                    </div>
                    <div className="field-wrapper full-width">
                        <FormControl fullWidth sx={InputFilledStyle} variant="filled">
                            <InputLabel id="sexo">Sexo</InputLabel>
                            <Select
                                id="sexo"
                                label="sexo"
                                name="sexo"
                                value={datos.sexo}
                                onChange={handleChange}
                                sx={InputFilledStyle}
                                variant="filled"
                                fullWidth
                            >
                                <MenuItem value={'M'}>Masculino</MenuItem>
                                <MenuItem value={'F'}>Femenino</MenuItem>
                                <MenuItem value={'D'}>Dinosaurio</MenuItem>

                            </Select></FormControl>
                    </div>


                    <div className="buttons-group">
                        <button
                            type="button"
                            onClick={handleActualizar}
                            className='btn btn-4'
                        >
                            Actualizar
                        </button>
                        <button
                            type="button"
                            onClick={handleDescartar}
                            className='btn btn-3'
                        >
                            Descartar
                        </button>
                    </div>
                </form>
            </>
        )
        }
    </>
}