import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import axios from 'axios'
import Swal from 'sweetalert2'

import './AdRequestDev.css'
import { EstadoSolicitud } from '../../../../utils/constants'

export function AdRequestDev() {
    const ENDPOINT = process.env.REACT_APP_API + "/users/developers/solicitudes"
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        if (!solicitudes.length) {
            getSolicitudes()
        }
    }, [])

    const getSolicitudes = () => {
        axios.get(ENDPOINT)
            .then((respuesta) => {
                setSolicitudes(respuesta.data)
            })
            
    }

    const handleAceptar = (id) => {
        axios.patch(`${process.env.REACT_APP_API}/users/developers/${id}/solicitud`, {
            estado: 1
        }).then(() => {
            Swal.fire({
                title: 'Solicitud aceptada',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                getSolicitudes()
            })
        }).catch((error) => {
            Swal.fire({
                title: 'Error al aceptar la solicitud',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
            console.log('Error al aceptar la solicitud', error)
        })
    }

    const handleRechazar = (id) => {
        axios.patch(`${process.env.REACT_APP_API}/users/developers/${id}/solicitud`, {
            estado: 2
        }).then(() => {
            Swal.fire({
                title: 'Solicitud denegada',
                icon: 'info',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                getSolicitudes()
            })
        }).catch(() => {
            Swal.fire({
                title: 'Error al denegar la solicitud',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        });
    }

    return <>
        {
            solicitudes === null ? <></> : (

                <div className="usuariosDevsPage">
                    <h2><span>SOLICITUDES DE </span>DESARROLLADOR</h2>
                    <h3><span>USUARIOS DESARROLLADORES ACTIVOS</span></h3>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Asunto</strong></TableCell>
                                    <TableCell><strong>Mensaje</strong></TableCell>
                                    <TableCell><strong>Usuario</strong></TableCell>
                                    <TableCell><strong>Estado</strong></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {solicitudes.map((solicitud) => {
                                    return (
                                        <TableRow
                                            key={solicitud.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>{solicitud.nombre}</TableCell>
                                            <TableCell><p>{solicitud.mensaje}</p></TableCell>
                                            <TableCell><a href={"mailto:" + solicitud.user.correo} style={{ color: '#38a3a5' }}><strong>{solicitud.user.correo}</strong></a></TableCell>
                                            <TableCell>{solicitud.estado === EstadoSolicitud.PENDIENTE ? 'Pendiente' : solicitud.estado === EstadoSolicitud.ACEPTADA ? 'Aceptada' : 'Rechazada'}</TableCell>
                                            <TableCell>
                                                {solicitud.estado === EstadoSolicitud.PENDIENTE ? <div className="buttons-group">
                                                    <button className='btn btn-1' onClick={() => handleAceptar(solicitud.user.id)}>
                                                        <span className="material-symbols-outlined">
                                                            how_to_reg
                                                        </span>
                                                    </button>
                                                    <button className='btn btn-3' onClick={() => handleRechazar(solicitud.user.id)}>
                                                        <span className="material-symbols-outlined">
                                                            delete
                                                        </span>
                                                    </button>
                                                </div> : <></>}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div >
            )
        }
    </>
}