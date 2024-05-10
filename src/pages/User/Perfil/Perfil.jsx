import { useState, useEffect } from "react"
import axios from "axios"
import { MenuItem, Select, TextField } from "@mui/material"
import { InputFilledStyle } from "../../../utils/mui.styles"
import { Link } from "react-router-dom"
import "./Perfil.css"

export function Perfil() {

    const [validacion, setValidacion] = useState(true)
    const [datos, setDatos] = useState({
        nombre: '',
        fechaNacimiento: '',
        correo: '',
        pais: '',
        sexo: ''
    });
    const [datosOriginales, setDatosOriginales] = useState({
        nombre: '',
        fechaNacimiento: '',
        correo: '',
        pais: '',
        sexo: ''
    });

    useEffect(() => {
        axios.get(process.env.REACT_APP_API + "/users/1")
            .catch((error) => {
                console.log(error)
            })
            .then((respuesta) => {
                setValidacion(false)
                const user = respuesta.data
                setDatos(user);
                setDatosOriginales(user);
            })
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDatos(prevDatos => ({ ...prevDatos, [name]: value }));
    };

    const handleActualizar = (event) => {
        event.preventDefault();

        // AQUI DEBO HACER UNA PETICION PATCH y otro get y mostrar un error si no se actualizo con alert
        console.log('Datos enviados:', datos);
    };

    const handleDescartar = (event) => {
        event.preventDefault();
        setDatos(datosOriginales);
    };
    return <>
        {validacion ? <></> : (
            <>
                <div className="container">
                    <div className="content-layout informacion-usuario">
                        <aside className="botones-perfil">
                            <Link to="/perfil">Informacion Personal</Link> <br />
                            <Link to="/perfil/biblioteca">Biblioteca</Link> <br />
                            <Link to="#">Perfil Programador</Link> <br />
                        </aside>
                        <main>
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

                                    </Select>
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
                        </main>
                    </div>
                </div>
            </>
        )
        }
    </>
}