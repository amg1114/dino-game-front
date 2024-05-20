import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ListaNoticia } from "../../../../partials/ListaNoticia/ListaNoticia";
import './AdNews.css'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Swal from "sweetalert2";
export function AdNews() {
    const ENDPOINT_API = process.env.REACT_APP_API + "/noticias"
    const [noticias, setNoticias] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(ENDPOINT_API)
            .catch(function (error) {
                console.log(error)
            })
            .then(function (respuesta) {
                setNoticias(respuesta.data)
            })

    }, [])

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar esta noticia?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteNews(id)
            }
        })
    }

    const deleteNews = (id) => {
        axios.delete(`${ENDPOINT_API}/${id}`)
            .then(() => {
                Swal.fire({
                    title: 'Noticia eliminada',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    navigate('/admin/noticias')
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return <>
        
            <div className="noticiasPageAdmin">
                <h2><span>DINO</span>NOTICIAS</h2>
                <div className="buttons-group align-end">
                    <Link className="btn btn-2 boton-agregar-noticia" to='/admin/noticias/form'>
                        AGREGAR NOTICIA
                    </Link>
                </div>
                {noticias.length > 0 ? <TableContainer sx={{ marginTop: '20px' }}>
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
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {noticias.map((noticia) => {
                                return (
                                    <TableRow
                                        key={noticia.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>
                                            {noticia.assets.length ? <img src={noticia.assets[0].url} width="80px" /> : <></>
                                            }
                                        </TableCell>
                                        <TableCell>{noticia.titulo}</TableCell>
                                        <TableCell><p dangerouslySetInnerHTML={{ __html: noticia.descripcion.slice(0, 150) + '...' }}></p></TableCell>
                                        <TableCell>
                                            <div className="buttons-group">
                                                <Link to={`/noticias/${noticia.id}`} className='btn btn-2'>
                                                    <span className="material-symbols-outlined">
                                                        public
                                                    </span>
                                                </Link>
                                                <button className='btn btn-3' onClick={() => handleDelete(noticia.id)}>
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
                </TableContainer> : <p>No hay noticias aún</p>
                }
            </div>
        <Outlet />
    </>
}