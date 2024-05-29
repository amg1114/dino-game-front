import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { InputFilledStyle } from "../../../utils/mui.styles";
import axios from "axios";
import './Login.css'
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../../providers/AuthProvider";



export function Login() {
    const ENDPOINT = process.env.REACT_APP_API + "/auth/login";
    
    const { usuario, updateToken } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        if (usuario) {
            navigate("/")
        }
    }, [usuario]);

    const logueo = () => {
        axios.post(ENDPOINT, { correo: email, password })
            .then((respuesta) => {
                updateToken(respuesta.data.access_token)
                Swal.fire({
                    icon: "success",
                    title: "Logueado Correctamente",
                    text: "Su sesión ha sido iniciada correctamente"
                }).then(() => {
                    navigate("/")
                })
            })
            .catch(function (error) {
                console.error(error)
                Swal.fire({
                    icon: "error",
                    title: "Error al Iniciar sesión",
                    text: error.response.data.message
                })
            })
    }

    return (
        <>
            <div className="modal-fade animate__animated animate__fadeIn">
                <div className="modal-form animate__animated animate__slideInDown">
                    <div className="modal-header">
                        <Link to="/" className="modal-closer">
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </Link>
                    </div>
                    <div className="container">
                        <form className="form login-form">
                            <h2 className="login-titulo">login</h2>
                            <div className="field-wrapper full-width">
                                <TextField fullWidth type="email" id="filled-basic" label="Correo electronico" variant="filled" onChange={(event) => { handleEmail(event) }} value={email} sx={InputFilledStyle} />
                            </div>
                            <div className="field-wrapper full-width">
                                <TextField fullWidth type="password" id="filled-basic" label="Contraseña" variant="filled" onChange={(event) => { handlePassword(event) }} value={password} sx={InputFilledStyle} />
                            </div>
                            <div className="botones-login-register">
                                <button className="btn-inicio-sesion" type="button" onClick={logueo}>INICIAR SESION</button>
                                <Link className="opc-registro" to="/register">
                                    registrarse
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

