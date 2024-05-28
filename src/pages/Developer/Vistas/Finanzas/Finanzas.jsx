import { MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { InputFilledStyleAdmin } from "../../../../utils/mui.styles-admin";
import axios from "axios";
import { useAuth } from "../../../../providers/AuthProvider";
import './Finanzas.css'

export function Finanzas() {
    const { usuario } = useAuth();
    const [mes, setMes] = useState(0);
    const [juegos, setJuegos] = useState(null);
    const [finanzas, setFinanzas] = useState([]);

    const ENDPOINT = process.env.REACT_APP_API + "/video-games";

    const mesActual = new Date().getMonth();

    const handleChange = (event) => {
        setMes(event.target.value);
    };

    useEffect(() => {
        if (usuario !== null && juegos === null) {
            axios.get(`${ENDPOINT}/developer/${usuario.id}/video-games`)
                .then((respuesta) => {
                    setJuegos(respuesta.data);
                })
                .catch((error) => {
                    if (error.code === "ERR_BAD_REQUEST") {
                        setJuegos([]);
                    } else {
                        console.log(error);
                    }
                });
        } else if (juegos !== null && usuario !== null) {
            setFinanzas([])
            juegos.map(juego => {
                axios.get(`${ENDPOINT}/${juego.id}/ventas/${mes}`)
                    .then(respuesta => {
                        const newFinanza = {
                            imagen: juego.assets[0].asset.url,
                            titulo: juego.titulo,
                            ventas: respuesta.data.cant_ventas,
                            ganancias: respuesta.data.ganancias
                        };
                        console.log(respuesta.data)
                        console.log('MES ACTUAL: ' + mes)
                        setFinanzas(prevFinanzas => [...prevFinanzas, newFinanza]);
                    })
                    .catch(error => console.log(error));
            });
        }
    }, [usuario, mes, juegos]);

    return (
        <div className="container container-finanzas">
            <div className="titulo">
            <h3>SELECCIONE UN MES</h3>
            </div>
            <Select
                id="mes"
                value={mes}
                placeholder="SELECCIONE UN MES"
                onChange={handleChange}
                fullWidth
                sx={InputFilledStyleAdmin}
                variant="filled"
            >
                {Array.from({ length: mesActual + 1 }, (_, index) => (
                    <MenuItem key={index} value={index}>
                        {new Date(0, index).toLocaleString('es-ES', { month: 'long' }).toUpperCase()}
                    </MenuItem>
                ))}
            </Select>
            {finanzas.length === 0 ? (
                <h3>NO GENERO GANANCIAS ESTE MES</h3>
            ) : (
                <div className="body-table">
                    <h3><span>FINANZAS</span> DE {new Date(0, mes).toLocaleString('es-ES', { month: 'long' }).toUpperCase()}</h3>
                    <TableContainer sx={{ marginTop: '20px' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <span className="material-symbols-outlined">image</span>
                                    </TableCell>
                                    <TableCell><strong>Titulo</strong></TableCell>
                                    <TableCell><strong>Cantidad De ventas</strong></TableCell>
                                    <TableCell><strong>Ganancias</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {finanzas.map((finanza, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <img src={finanza.imagen} alt={finanza.titulo} width="80px" />
                                        </TableCell>
                                        <TableCell>{finanza.titulo}</TableCell>
                                        <TableCell>{finanza.ventas}</TableCell>
                                        <TableCell>${finanza.ganancias}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    );
}
