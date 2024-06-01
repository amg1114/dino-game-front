import { Link, useParams } from "react-router-dom"
import './VistaCompra.css'
import TarjetaVisa from "./Imagenes/TarjetaVisa.png"
import TarjetaMaster from "./Imagenes/TarjetaMaster.png"
import TarjetaAmerican from "./Imagenes/TarjetaAmerican.png"
import TarjetaAval from "./Imagenes/TarjetaAval.png"
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { InputFilledStyle } from "../../../utils/mui.styles"
import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"


export function VistaCompra() {
    const { id } = useParams();
    const ENDPOINT_API = process.env.REACT_APP_API + "/video-games/" + id
    const [juego, setJuego] = useState(null);

    useEffect(() => {
        axios.get(ENDPOINT_API)
            .then(function (respuesta) {
                setJuego(respuesta.data);
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salió mal',
                });
            })

    }, [])

    return <>
        {juego === null ? <></> : (
            juego.precio === 0 ? <>
                <div className="modal-fade animate__animated animate__fadeIn">
                    <div className="modal-content-descarga modal-form animate__animated animate__slideInDown">
                        <div className="modal-header">
                            <Link to="/Juegos" className="modal-closer">
                                <span className="material-symbols-outlined">
                                    close
                                </span>
                            </Link>
                        </div>
                        <div className="container-descarga">
                            <h2 className="titulo">ADQUIRIR JUEGO</h2>
                            <p className="informacion">Gran noticia! El juego que quieres es totalmente gratuito.
                                Así que prepárate para disfrutar de horas de diversión sin gastar ni un centavo.
                                ¡Descárgalo ya y que empiece la diversión!
                                ¡Disfruta al máximo!
                            </p>

                        </div>
                        <div className="buttons-group1">
                            <button
                                type="button"
                                className='btn btn-3'
                            >
                                CANCELAR
                            </button>
                            <button
                                type="button"
                                className='btn btn-1'
                            >
                                DESCARGAR
                            </button>
                        </div>
                    </div>
                </div>
            </>
                : <>
                    <div className="modal-fade animate__animated animate__fadeIn">
                        <div className="modal-content-compra modal-form animate__animated animate__slideInDown">
                            <div className="modal-header">
                                <Link to="/Juegos" className="modal-closer">
                                    <span className="material-symbols-outlined">
                                        close
                                    </span>
                                </Link>
                            </div>
                            <div className="container-compra">
                                <h2 className="tituloJuego">COMPRAR JUEGO</h2>
                                <h3 className="Subtitulo">METODOS DE PAGO</h3>
                                <div className="ListaImage">
                                    <img src={TarjetaVisa} alt="imagen1" />
                                    <img src={TarjetaMaster} alt="imagen2" />
                                    <img src={TarjetaAmerican} alt="imagen3" />
                                    <img src={TarjetaAval} alt="imagen4" />
                                </div>
                                <h3 className="Subtitulo1">DATOS DE PAGO</h3>
                                <form className="formulario">
                                    <div className="field-wrapper full-width ">
                                        <TextField
                                            id="TitularTarjeta"
                                            name="TitularTarjeta"
                                            label="TITULAR DE LA TARJETA"
                                            size="small"
                                            sx={InputFilledStyle}
                                            variant="filled"
                                            fullWidth
                                        />
                                    </div>
                                    <div className="field-wrapper full-width ">
                                        <TextField
                                            id="NumeroTarjeta"
                                            name="NumeroTarjeta"
                                            type="number"
                                            label="NUMERO DE TARJETA"
                                            size="small"
                                            sx={InputFilledStyle}
                                            variant="filled"
                                            fullWidth
                                        />
                                    </div>
                                    <div className="field-wrapper full-width">
                                        <TextField
                                            id="fecha"
                                            label='Fecha de Nacimiento'
                                            name="fechaNacimiento"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size="small"
                                            sx={InputFilledStyle}
                                            variant="filled"
                                            fullWidth
                                        />
                                    </div>
                                    <div className="field-wrapper full-width">
                                        <TextField
                                            id="CVCTARJETA"
                                            name="CVCTARJETA"
                                            type="number"
                                            label="CVC"
                                            size="small"
                                            sx={InputFilledStyle}
                                            variant="filled"
                                            fullWidth
                                        />
                                    </div>
                                </form>
                                <div className="buttons-group">
                                    <button
                                        type="button"
                                        className='btn btn-3'
                                    >
                                        CANCELAR
                                    </button>
                                    <button
                                        type="button"
                                        className='btn btn-1'
                                    >
                                        COMPRAR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
        )
        }
    </>
}
