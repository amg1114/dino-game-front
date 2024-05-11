import { Link } from "react-router-dom"
import { TextField, MenuItem } from "@mui/material"
import { InputFilledStyle } from "../../../utils/mui.styles";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import './Registro.css'


export function Registro() {

    const ENDPOINT = process.env.REACT_APP_API + "/auth/register";

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [date, setDate] = useState("");

    const [country, setCountry] = useState("");

    const [genero, setGenero] = useState("D");

    const handleName = (e) => {
        setName(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleDate = (e) => {
        setDate(e.target.value);
    };

    const handleCountry = (e) => {
        setCountry(e.target.value);
    };

    const handleGenero = (e) => {
        setGenero(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const register = () => {
        axios.post(ENDPOINT, { nombre: name, fechaNacimiento: date, sexo: genero, pais: country, correo: email, password })
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Registrado Correctamente",
                    text: "Usuario Registrado Correctamente"
                })
            })
            .catch(function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error en el registro",
                    text: error.response.data.message
                })
                console.log(error)
            })
    }

    return (
        <div>
            <div className="modal-fade animate__animated animate__fadeIn">
                <div className="modal-content modal-form animate__animated animate__slideInDown">
                    <div className="modal-header">
                        <Link to="/" className="modal-closer">
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </Link>
                    </div>
                    <div className="container">
                        <form className="form">
                            <h2 className="registro-titulo">registro</h2>
                            <div className="field-wrapper full-width">
                                <TextField fullWidth type="input" id="filled-basic" label="Nombre" variant="filled" onChange={(event) => { handleName(event) }} value={name} sx={InputFilledStyle} />
                            </div>
                            <div className="field-wrapper full-width">
                                <TextField fullWidth type="email" id="filled-basic" label="Correo electronico" variant="filled" onChange={(event) => { handleEmail(event) }} value={email} sx={InputFilledStyle} />
                            </div>
                            <div className="field-wrapper full-width">
                                <TextField className="date" fullWidth type="date" id="filled-basic" label="Fecha de nacimiento" variant="filled" onChange={(event) => { handleDate(event) }} value={date} sx={InputFilledStyle} />
                            </div>
                            <div className="field-wrapper full-width">
                                <TextField fullWidth type="input" id="filled-basic" label="Pais" variant="filled" onChange={(event) => { handleCountry(event) }} value={country} sx={InputFilledStyle} />
                            </div>
                            <div className="field-wrapper full-width">
                                <TextField select fullWidth id="filled-basic" label="Genero" variant="filled" value={genero} onChange={(event) => { handleGenero(event) }} sx={InputFilledStyle}>
                                    <MenuItem value="M">Masculino</MenuItem>
                                    <MenuItem value="F">Femenino</MenuItem>
                                    <MenuItem value="D">Dinosaurio</MenuItem>
                                </TextField>

                            </div>
                            <div className="field-wrapper full-width">
                                <TextField fullWidth type="password" id="filled-basic" label="Contraseña" variant="filled" onChange={(event) => { handlePassword(event) }} value={password} sx={InputFilledStyle} />
                            </div>
                            <div className="botones-login-register">
                                <button className="btn-registrarse" type="button" onClick={register}>registrarse</button>
                                <Link className="opc-inicio-sesion" to="/login">
                                    iniciar sesión
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}