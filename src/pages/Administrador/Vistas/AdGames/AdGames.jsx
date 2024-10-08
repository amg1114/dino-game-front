import './AdGames.css'

import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { FormularioFiltros } from "../../../../partials/FormularioFiltros/FormularioFiltros"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Swal from "sweetalert2"

export function AdGames() {
    const navigate = useNavigate()
    const ENDPOINT = process.env.REACT_APP_API + "/video-games";
    const [juegos, setJuegos] = useState([]);

    useEffect(() => {
        if (!juegos.length) {
            loadGames();
        }
    }, []);

    const loadGames = (params = {}) => {
        axios.get(ENDPOINT, { params })
            .then((respuesta) => {
                setJuegos(respuesta.data)
            })
            .catch((error) => {
                console.log(error)
            });
    };

    const Search = (data) => {
        const params = {}
        if (data.search) params.search = data.search
        if (data.categoria) params.categoria = data.categoria.id
        if (data.precio) params.precio = data.precio
        loadGames(params)
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar este juego?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteGame(id)
            }
        })
    }

    const deleteGame = (id) => {
        axios.delete(`${ENDPOINT}/${id}`)
            .then(() => {
                Swal.fire({
                    title: 'Juego eliminado',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    loadGames()
                })
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error al eliminar el juego',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
                console.log(error)
            })
    }
    return (
        <div className="container container-admin">
            <h2><span>ADMINISTRAR </span>JUEGOS</h2>
            <FormularioFiltros onSearch={Search} />
            {
                juegos === null ? <><p>Game was not found</p></> : (
                    <TableContainer sx={{ marginTop: '20px' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <span className="material-symbols-outlined">
                                            image
                                        </span>
                                    </TableCell>
                                    <TableCell><strong>Titulo</strong></TableCell>
                                    <TableCell><strong>Descripcion</strong></TableCell>
                                    <TableCell><strong>Desarrollador</strong></TableCell>
                                    <TableCell><strong>Precio</strong></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {juegos.map((juego) => {
                                    return (
                                        <TableRow
                                            key={juego.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>
                                                {juego.assets.length ? <img src={juego.assets[0].asset.url} width="80px" /> : <></>
                                                }
                                            </TableCell>
                                            <TableCell>{juego.titulo}</TableCell>
                                            <TableCell><p>{juego.descripcion}</p></TableCell>
                                            <TableCell>
                                                {juego.developer ? <p>
                                                    {juego.developer.user.nombre}<br />
                                                    <a href={"mailto:" + juego.developer.user.correo} style={{ color: '#38a3a5' }}><strong>{juego.developer.user.correo}</strong></a>
                                                </p> : <p>Desarrollador no encontrado</p>}
                                            </TableCell>
                                            <TableCell>${juego.precio}</TableCell>
                                            <TableCell>
                                                <div className="buttons-group">
                                                    <Link to={`/juegos/${juego.id}`} className='btn btn-2'>
                                                        <span className="material-symbols-outlined">
                                                            public
                                                        </span>
                                                    </Link>
                                                    <button className='btn btn-1' onClick={() => navigate(`/admin/${juego.id}/descuentos`)}>
                                                        <span className="material-symbols-outlined">
                                                            price_change
                                                        </span>
                                                    </button>
                                                    <button className='btn btn-3' onClick={() => handleDelete(juego.id)}>
                                                        <span className="material-symbols-outlined">
                                                            delete
                                                        </span>
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
        </div>
    );
}