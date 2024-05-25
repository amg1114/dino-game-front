import { Link,useParams } from "react-router-dom"
import './VistaCompra.css'
import TarjetaVisa from "./Imagenes/TarjetaVisa.png"
import TarjetaMaster from "./Imagenes/TarjetaMaster.png"
import TarjetaAmerican from "./Imagenes/TarjetaAmerican.png"
import TarjetaAval from "./Imagenes/TarjetaAval.png"
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { InputFilledStyle } from "../../../utils/mui.styles"
import axios from "axios";
import { useEffect, useState } from "react";





export function VistaCompra() {

    return <>
        
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
                        <div className="ListaImagen">
                            <img src={TarjetaVisa} />
                            <img src={TarjetaMaster} />
                            <img src={TarjetaAmerican} />
                            <img src={TarjetaAval} />
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
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className='btn btn-1'
                            >
                                Comprar
                            </button>
                        </div>
                    </div>
                </div>
            </div>      
    </>
}
