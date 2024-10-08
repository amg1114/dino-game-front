import { Link, useNavigate, useParams } from "react-router-dom"
import './VistaCompra.css'
import TarjetaVisa from "./Imagenes/TarjetaVisa.png"
import TarjetaMaster from "./Imagenes/TarjetaMaster.png"
import TarjetaAmerican from "./Imagenes/TarjetaAmerican.png"
import TarjetaAval from "./Imagenes/TarjetaAval.png"
import { TextField } from "@mui/material"
import { InputFilledStyle } from "../../../utils/mui.styles"
import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2";


export function VistaCompra() {
    const { id } = useParams();
    const ENDPOINT_API = process.env.REACT_APP_API + "/video-games/" + id
    const [juego, setJuego] = useState(null);
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [numero, setNumero] = useState("");
    const [fecha, setFecha] = useState("");
    const [cvc, setCvc] = useState("");


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
                console.log(error)
            })

    }, [])

    const handleComprar = () => {

        if ( juego.precio > 0 && (!nombre || !numero || !fecha || !cvc)) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Todos los campos son requeridos"
            })
            return
        }

        let precio = juego.precio;
        if (juego.descuentos[0]) {
            precio = precio - (precio * juego.descuentos[0])
        }
        axios.post(process.env.REACT_APP_API + "/video-games/biblioteca/" + id, {
            precio
        })
            .then(res => {
                Swal.fire({
                    title: "Juego Adquirido!!",
                    icon: "success",
                    text: "Disfruta tu Compra",
                    timer: 2000
                }).then(() => {
                    window.location.href = "/perfil/biblioteca"
                })
            })
            .catch(err => {
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "No se pudo comprar el juego"
                })
                console.log(err)
            })
    }

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
                                        onClick={() => navigate(-1)}
                                    >
                                        CANCELAR
                                    </button>
                                    <button
                                        type="button"
                                        className='btn btn-1'
                                        onClick={() => handleComprar()}
                                    >
                                        COMPRAR
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
                                            onChange={(e) => {setNombre(e.target.value)}}
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
                                            onChange={(e) => {setNumero(e.target.value)}}
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
                                            onChange={(e) => {setFecha(e.target.value)}}
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
                                            onChange={(e) => {setCvc(e.target.value)}}
                                        />
                                    </div>
                                </form>
                                <div className="buttons-group">
                                    <button
                                        type="button"
                                        className='btn btn-3'
                                        onClick={() => navigate(-1)}
                                    >
                                        CANCELAR
                                    </button>
                                    <button
                                        type="button"
                                        className='btn btn-1'
                                        onClick={() => handleComprar()}
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
