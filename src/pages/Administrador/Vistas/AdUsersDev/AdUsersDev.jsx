import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import Swal from 'sweetalert2'
import axios from 'axios'

import './AdUsersDev.css'

export function AdUsersDev() {
    const ENPOINT = process.env.REACT_APP_API + "/users/developers"
    const [users, setUsers] = useState(null)

    useEffect(() => {
        if (users === null) {
            getUsers()
        }
    }, [])

    const getUsers = () => {
        axios.get(ENPOINT)
            .then((respuesta) => {
                setUsers(respuesta.data)
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salió mal',
                });
            })
    }

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_API}/users/developers/${id}`)
            .then(() => {
                Swal.fire({
                    title: 'Usuario eliminado',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    getUsers()
                })
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error al eliminar el usuario',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
                console.log('Error al eliminar el usuario', error)
            })
    }

    return <>
        {users === null ? <></> : (

            <div className="usuariosDevsPage">
                <h2><span>ADMINISTRAR</span> USUARIOS</h2>
                <h3><span>USUARIOS DESARROLLADORES ACTIVOS</span></h3>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Nombre</strong></TableCell>
                                <TableCell><strong>Correo</strong></TableCell>
                                <TableCell><strong>País</strong></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => {
                                return (
                                    <TableRow
                                        key={user.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{user.user.nombre}</TableCell>
                                        <TableCell><a href={"mailto:" + user.user.correo} style={{ color: '#38a3a5' }}><strong>{user.user.correo}</strong></a></TableCell>
                                        <TableCell>{user.user.pais}</TableCell>
                                        <TableCell>
                                            <button className='btn btn-3' onClick={()=>handleDelete(user.id)}><span className="material-symbols-outlined">
                                                delete
                                            </span></button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )}
    </>
}