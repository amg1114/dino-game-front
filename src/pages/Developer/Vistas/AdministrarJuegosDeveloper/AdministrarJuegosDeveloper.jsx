import axios from "axios"
import { useEffect, useState } from "react"
import { GameCard } from "../../../../components/GameCard/GameCard"
import { useAuth } from "../../../../providers/AuthProvider"
import { FormularioFiltros } from "../../../../partials/FormularioFiltros/FormularioFiltros"
import './AdministrarJuegosDeveloper.css'
import { Link, Outlet } from "react-router-dom"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Swal from "sweetalert2"

export function AdministrarJuegosDeveloper() {
    const { usuario } = useAuth()
    const ENDPOINT = process.env.REACT_APP_API + "/video-games";
    const [juegos, setJuegos] = useState([]);
    const [render, setRender] = useState(false)

    useEffect(() => {
        if (usuario !== null) {
            loadGames();
        }
    }, [usuario,render]);

    const loadGames = (params = {}) => {
        if (usuario) {
            axios.get(`${ENDPOINT}/developer/${usuario.id}/video-games`, { params })
            .then((respuesta) => {
                setJuegos(respuesta.data)
            })
            .catch((error) => {

                console.log(error)
            })
        }
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
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salió mal',
                });
                console.log(error)
            })
    }
    const handleRender = () => {
        setRender(!render)
    }
    return (
        <div className="container container-developer">
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
                                                    <Link to={`/dashboard/update/${juego.id}`} className='btn btn-1'>
                                                        <span className="material-symbols-outlined">
                                                            edit
                                                        </span>
                                                    </Link>
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
            <Outlet  context={{ handleRender }} />
        </div>
    );
}