import { useEffect, useState } from 'react'
import './AdUsersDev.css'
import axios from 'axios'
import { useAuth } from '../../../../providers/AuthProvider'

export function AdUsersDev() {
    const ENPOINT = process.env.REACT_APP_API + "/users/developers"
    const [users, setUsers] = useState(null)
    const { token } = useAuth()
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

    useEffect(() => {
        axios.get(ENPOINT)
            .then((respuesta) => {
                setUsers(respuesta.data)
                console.log(respuesta.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    return <>
        {users === null ? <></> : (

            <div className="usuariosDevsPage">
                <h2><span>ADMINISTRAR</span> USUARIOS</h2>
                <h3><span>USUARIOS DESARROLLADORES ACTIVOS</span></h3>
                <div className='cuadro-users'>
                    <h3 className='title'>NOMBRE</h3>
                    <h3 className='title'>CORREO</h3>
                    <h3 className='title'>PAIS</h3>
                    <div className='title'></div>
                    {
                        users.map((usuario, index) => {
                            return <>
                                <div className='info'>{usuario.user.nombre}</div>
                                <div className='info'>{usuario.user.correo}</div>
                                <div className='info'>{usuario.user.pais}</div>
                                <div className='info info-boton'>
                                    <button
                                        className='btn btn-3 btn-eliminar-dev'
                                        onClick={() => {
                                            axios.delete(ENPOINT + `/${usuario.id}`)
                                                .then((respuesta) => {
                                                    console.log(respuesta.data)
                                                })
                                                .catch((error) => {
                                                    console.log(error)
                                                })
                                        }}>
                                        ELIMINAR
                                    </button>
                                </div>
                            </>
                        })
                    }

                </div>
            </div>
        )}
    </>
}