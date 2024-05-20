import { useEffect, useState } from 'react'
import './AdRequestDev.css'
import axios, { Axios } from 'axios'
import { useAuth } from '../../../../providers/AuthProvider'

export function AdRequestDev() {
    const ENDPOINT = process.env.REACT_APP_API + "/users/developers/solicitudes"
    const [solicitudes, setSolicitudes] = useState([])
    const { token } = useAuth()
    useEffect(() => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios.get(ENDPOINT)
            .then((respuesta) => {
                setSolicitudes(respuesta.data)
                console.log(respuesta.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    const handleAceptar = () => {
        //AQUI DEBE IR UNA PETICION PARA ACEPTAR LA SOLICITUD DE DESARROLLADOR Y CREAR EL PERFIL
    }
    const handleRechazar= () => {
        //AQUI DEBE IR UNA PETICION PARA RECHAZAR LA SOLICITUD DE DESARROLLADOR
    }
    return <>
        {
            solicitudes === null ? <></> : (

                <div className="usuariosDevsPage">
                    <h2><span>SOLICITUDES DE </span>DESARROLLADOR</h2>
                    <h3><span>USUARIOS DESARROLLADORES ACTIVOS</span></h3>
                    <div className='cuadro-users'>
                        <h3 className='title'>ASUNTO</h3>
                        <h3 className='title'>MENSAJE</h3>
                        <h3 className='title'>USUARIO</h3>
                        <div className='title'></div>
                        {solicitudes.map((solicitud, index) => {
                            return <>
                                <div className='info' key={"nombre de la solicitud" +index}><p>{solicitud.nombre}</p></div>
                                <div className='info' key={"mensaje de la solicitud"+index}><p>{solicitud.mensaje}</p></div>
                                <div className='info' key={"nombre del usuario"+index}><p>{solicitud.user.nombre}</p></div>
                                <div className='info info-boton botones-solicitudes' key={"boton eliminar usuario dev"+index}>
                                    <button onClick={handleAceptar} key={"boton aceptar" + index}>
                                        <span className="material-symbols-outlined" key={"boton aceptar icono" + index}>
                                            check
                                        </span>
                                    </button>
                                    <button onClick={handleRechazar} key={"boton rechazar" + index}>
                                        <span className="material-symbols-outlined" key={"boton rechazar icono" + index}>
                                            close
                                        </span>
                                    </button>
                                </div>
                            </>
                        })
                        }

                    </div >
                </div>
            )
        }
    </>
}