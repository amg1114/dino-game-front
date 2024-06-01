import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"

export function AdDescuentos() {
    const { id } = useParams()
    const [descuentos, setDescuentos] = useState(null)
    const [juego, setJuego] = useState([])
    const [fechaInicio, setFechaInicio] = useState([])
    const [fechaFin, setFechaFin] = useState([])
    const [update, setUpdate] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/video-games/${id}`)
            .then((response) => {
                axios.get(`${process.env.REACT_APP_API}/video-games/${id}/descuentos`)
                    .then((respuesta) => {
                        setDescuentos(respuesta.data)
                        setJuego(response.data)
                    })
            })
    }, [id, update])

    const estado = (fechaI, fechaF) => {
        const fechaActual = new Date()
        const fechaInicio = new Date(fechaI)
        const fechaFinal = new Date(fechaF)
        if (fechaActual < fechaInicio) {
            return <p>INNACTIVO</p>
        } else if (fechaActual > fechaFinal) {
            return <p>EXPIRADO</p>
        } else return <p>ACTIVO</p>
    }
    const handleBorrar = (descuento) => {
        Swal.fire({
            title: 'ESTAS SEGURO DE ELIMINAR ESTE DESCUENTO?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API}/video-games/${id}/descuentos/${descuento}`)
                    .then((respuesta) => {
                        console.log(respuesta.data)
                        setUpdate(!update)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        })
    }

    const handleUpdate = () => {
        setUpdate(!update);
    };
    return <>
        {
            descuentos === null ? <h3 style={{textAlign: 'center'}}>NO TIENE NINGUN DESCUENTO</h3> : (
                <>
                    <h3 style={{textAlign: 'center'}}>Descuentos De <span>{juego.titulo}</span></h3>
                    <TableContainer>
                        <Table>
                            <TableHead >
                                <TableRow>
                                    <TableCell sx={{textAlign: 'center'}}><strong>Fecha De Inicio</strong></TableCell>
                                    <TableCell sx={{textAlign: 'center'}}><strong>Fecha Final</strong></TableCell>
                                    <TableCell sx={{textAlign: 'center'}}><strong>Porcentaje</strong></TableCell>
                                    <TableCell sx={{textAlign: 'center'}}><strong>Estado</strong></TableCell>
                                    <TableCell sx={{textAlign: 'center'}}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    descuentos.map((descuento, index) => {
                                        return <>
                                            <TableRow key={index}>
                                                <TableCell sx={{textAlign: 'center'}}><p>{descuento.fechaInicio}</p></TableCell>
                                                <TableCell sx={{textAlign: 'center'}}><p>{descuento.fechaFin}</p></TableCell>
                                                <TableCell sx={{textAlign: 'center'}}><p>{descuento.porcentaje}</p></TableCell>
                                                <TableCell sx={{textAlign: 'center'}}>
                                                    {
                                                        estado(descuento.fechaInicio, descuento.fechaFin)
                                                    }
                                                </TableCell>
                                                <TableCell >
                                                    <div>
                                                        <button className="btn btn-3" onClick={() => handleBorrar(descuento.id)}>
                                                            BORRAR
                                                        </button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </>

                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )
        }
        <div className="boton-generar-descuento" style={{width: '100%',display: 'flex', justifyContent: 'end', marginTop:'20px'}}>
            <button className="btn btn-4" onClick={() => {navigate(`new`)}}>
                GENERAR DESCUENTO
            </button>
        </div>
        <Outlet context={{ handleUpdate }}/>
    </>
}