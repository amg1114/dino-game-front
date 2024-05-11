import { useState, useEffect } from "react"
import axios from "axios"
import { TextField } from "@mui/material"


export function Perfil() {

    const [validacion, setValidacion] = useState(true)
    const [datos, setDatos] = useState({
        nombre: '',
        fechaNacimiento: '',
        correo: '',
        pais: ''
    });
    const [datosOriginales, setDatosOriginales] = useState({
        nombre: '',
        fechaNacimiento: '',
        correo: '',
        pais: ''
    });

    useEffect(() => {
        axios.get(process.env.REACT_APP_API + "/users/1")
            .catch((error) => {
                console.log(error)
            })
            .then((respuesta) => {
                setValidacion(false)
                const user = respuesta.data
                setDatos({
                    nombre: user.nombre,
                    fechaNacimiento: user.fechaNacimiento,
                    correo: user.correo,
                    pais: user.pais
                });
                setDatosOriginales({
                    nombre: user.nombre,
                    fechaNacimiento: user.fechaNacimiento,
                    correo: user.correo,
                    pais: user.pais
                });
            })
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDatos(prevDatos => ({...prevDatos, [name]: value}));
    };

    const handleActualizar = (event) => {
        event.preventDefault();
        
        // AQUI DEBO HACER UNA PETICION PATCH
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
                            <a href="/perfil">Informacion Personal</a> <br />
                            <a href="/perfil/biblioteca">Biblioteca</a> <br />
                            <a href="#">Perfil Programador</a> <br />
                        </aside>
                        <main>
                            <form>
                                <TextField
                                    id="nombre"
                                    name="nombre"
                                    label="Nombre"
                                    value={datos.nombre}
                                    onChange={handleChange}
                                /><br /><br />

                                <TextField
                                    id="fecha"
                                    label='Fecha de Nacimiento'
                                    name="fechaNacimiento"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={datos.fechaNacimiento}
                                    onChange={handleChange} />
                                <br /><br />

                                <TextField
                                    id="correo"
                                    label='Correo electronico'
                                    name="correo"
                                    value={datos.correo}
                                    onChange={handleChange} />
                                <br /><br />

                                <TextField
                                    id="pais"
                                    label="Pais"
                                    name="pais"
                                    value={datos.pais}
                                    onChange={handleChange}
                                />
                                <br /><br />

                                <div className="botones">
                                    <button
                                        type="button"
                                        onClick={handleActualizar}
                                        className='btn btn-1'
                                    >
                                        Actualizar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDescartar}
                                        className='btn btn-1'
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