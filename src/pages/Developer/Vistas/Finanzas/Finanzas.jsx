import { MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { InputFilledStyleAdmin } from "../../../../utils/mui.styles-admin";
import axios from "axios";
import { useAuth } from "../../../../providers/AuthProvider";
import './Finanzas.css';

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
        const obtenerDatos = async () => {
            if (usuario) {
                try {
                    if (!juegos) {
                        const respuestaJuegos = await axios.get(`${ENDPOINT}/developer/${usuario.id}/video-games`);
                        setJuegos(respuestaJuegos.data);
                    }

                    if (juegos) {
                        const nuevasFinanzas = await Promise.all(juegos.map(async (juego) => {
                            const respuestaVentas = await axios.get(`${ENDPOINT}/${juego.id}/ventas/${mes}`);
                            return {
                                imagen: juego.assets[0].asset.url,
                                titulo: juego.titulo,
                                ventas: respuestaVentas.data.cant_ventas,
                                ganancias: respuestaVentas.data.ganancias
                            };
                        }));
                        setFinanzas(nuevasFinanzas);
                    }
                } catch (error) {
                    if (error.code === "ERR_BAD_REQUEST") {
                        setJuegos([]);
                    } else {
                        console.log(error);
                    }
                }
            }
        };

        obtenerDatos();
    }, [usuario, mes, juegos, ENDPOINT]);

    return (
        <div className="container container-finanzas">
            <div className="titulo">
                <h3>SELECCIONE UN MES</h3>
            </div>
            <FormControl fullWidth variant="filled" sx={InputFilledStyleAdmin}>
                <InputLabel id="mes-label">MES</InputLabel>
                <Select
                    labelId="mes-label"
                    id="mes"
                    value={mes}
                    onChange={handleChange}
                >
                    {Array.from({ length: mesActual + 1 }, (_, index) => (
                        <MenuItem key={index} value={index}>
                            {new Date(0, index).toLocaleString('es-ES', { month: 'long' }).toUpperCase()}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
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
                                        <TableCell>{finanza.ventas || 0}</TableCell>
                                        <TableCell>${finanza.ganancias || 0}</TableCell>
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
