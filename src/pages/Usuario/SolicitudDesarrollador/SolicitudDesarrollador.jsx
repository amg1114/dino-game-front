import { TextField } from "@mui/material"
import { InputFilledStyle } from "../../../utils/mui.styles"
import "./SolicitudDesarrollador.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../providers/AuthProvider";

export function SolicitudDesarrollador() {
    const { usuario } = useAuth()

    const [validacion, setValidacion] = useState(false)
    const [solicitud, setSolicitud] = useState({
        asunto: '',
        mensaje: ''
    })

    useEffect(() => {
        if (usuario) {
            axios.get(process.env.REACT_APP_API + `/api/users/${usuario.id}/solicitud-desarrollador`)
                .then((respuesta) => {
                    setValidacion(true)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [usuario])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSolicitud(prevSolicitud => ({ ...prevSolicitud, [name]: value }));
    };

    return <>
        {validacion ? <><h2>YA HAS REALIZADO UNA SOLICITUD</h2></> : (

            <div className="container">
                <div className="contenedor-solicitud">

                    <h2>SOLICITUD PERFIL DE DESARROLLADOR</h2>

                    <h2>¡HOLA <span>DINO</span>AMIGO! AL LLENAR ESTE FORMULARIO, SE ENVIARÁ UNA SOLICITUD PARA CREAR UN PERFIL DE DESARROLLADOR EL CUAL TE PERMITE PUBLICAR JUEGOS.</h2>

                    <form action="post" className="form">
                        <div className="field-wrapper full-width">
                            <TextField
                                id="asunto"
                                name="asunto"
                                label="Asunto"
                                placeholder="ASUNTO"
                                value={solicitud.asunto}
                                onChange={handleChange}
                                sx={InputFilledStyle}
                                variant="filled"
                                fullWidth
                            />
                        </div>

                        <div className="field-wrapper full-width">
                            <TextField
                                id="mensaje"
                                name="mensaje"
                                label="Mensaje"
                                placeholder="MENSAJE"
                                multiline
                                minRows={9}
                                value={solicitud.mensaje}
                                onChange={handleChange}
                                sx={InputFilledStyle}
                                variant="filled"
                                fullWidth
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
        }
    </>
}