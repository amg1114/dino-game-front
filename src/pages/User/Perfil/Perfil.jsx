import { useState, useEffect } from "react"
import axios from "axios"


export function Perfil() {

    const [usuario, setUsuario] = useState(null)

    useEffect(() => {
        axios.get(process.env.REACT_APP_API + "/users/1")
            .catch((error) => {
                console.log(error)
            })
            .then((respuesta) => {
                setUsuario(respuesta.data)
                document.getElementById("nombre").value = respuesta.data.nombre
                document.getElementById("fecha").value = respuesta.data.fechaNacimiento
                document.getElementById("correo").value = respuesta.data.correo
                document.getElementById("pais").value = respuesta.data.pais
            })
    }, [])
    
    return <>
        {usuario === null ? <></> : (
        <>
            <form>
                <label htmlFor="nombre">Nombre:</label><br />
                <input type="text" id="nombre" name="nombre" /><br /><br />

                <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label><br />
                <input type="date" id="fecha" name="fecha" /><br /><br />

                <label htmlFor="correo">Correo electrónico:</label><br />
                <input type="email" id="correo" name="correo" /><br /><br />

                <label htmlFor="pais">País:</label><br />
                <input type="text" id="pais" name="pais" /><br /><br />

            </form>
        </>
        )
        }
    </>
}