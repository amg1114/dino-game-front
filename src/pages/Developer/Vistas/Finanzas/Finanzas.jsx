import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useAuth } from "../../../../providers/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";

export function Finanzas() {
    const { usuario } = useAuth();
    const ENDPOINT = process.env.REACT_APP_API + "/video-games";
    const [juegos, setJuegos] = useState([]);
    const [finanzas, setFinanzas] = useState([]);

    useEffect(() => {
        if (usuario !== null && !juegos.length) {
            loadGames();
        }
    }, [usuario, juegos]);

    useEffect(() => {
        if (juegos.length && usuario !== null) {
            const allFinanzas = [];
            juegos.map((juego) => {
                for (let i = 0; i < 12; i++) {
                    axios.get(ENDPOINT + `/${juego.id}/ventas/${i}`)
                        .then((respuesta) => {
                            const newFinanza = {
                                imagen: juego.assets[0].asset.url,
                                titulo: juego.titulo,
                                mes: i + 1,
                                ventas: respuesta.data.cant_ventas,
                                ganancias: respuesta.data.ganancias
                            };
                            allFinanzas.push(newFinanza);
                            if (allFinanzas.length === juegos.length * 12) {
                                setFinanzas(allFinanzas);
                            }
                        });
                }
            });
        }
    }, [juegos]);

    const loadGames = (params = {}) => {
        if (usuario) {
            axios.get(`${ENDPOINT}/developer/${usuario.id}/video-games`, { params })
                .then((respuesta) => {
                    setJuegos(respuesta.data);
                })
                .catch((error) => {
                    if (error.code === "ERR_BAD_REQUEST") {
                        setJuegos(null);
                    } else {
                        console.log(error);
                    }
                });
        }
    };

    return (
        <div className="container container-developer">
            <h2>FINANZAS</h2>
            {
                finanzas.length <= 0 ? <></> : (
                    <TableContainer sx={{ marginTop: '20px' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <span className="material-symbols-outlined">
                                            image
                                        </span>
                                    </TableCell>
                                    <TableCell><strong>TITULO</strong></TableCell>
                                    <TableCell><strong>MES</strong></TableCell>
                                    <TableCell><strong>VENTAS</strong></TableCell>
                                    <TableCell><strong>GANANCIAS</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {finanzas.map((finanza, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>
                                            {finanza.imagen ? <img src={finanza.imagen} width="80px" /> : <></>}
                                        </TableCell>
                                        <TableCell>{finanza.titulo}</TableCell>
                                        <TableCell><p>{finanza.mes}</p></TableCell>
                                        <TableCell><p>{finanza.ventas}</p></TableCell>
                                        <TableCell>${finanza.ganancias}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
        </div>
    );
}
