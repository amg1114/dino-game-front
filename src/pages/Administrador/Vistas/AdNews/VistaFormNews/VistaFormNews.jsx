import { Link } from "react-router-dom";
import './VistaFormNews.css'
import { FilledInput, TextField } from "@mui/material";
import { InputFilledStyleAdmin } from "../../../../../utils/mui.styles-admin";

export function VistaFormNews() {
    return <>
        <div className="modal-fade animate__animated animate__fadeIn">
            <div className="modal-content-admin animate__animated animate__slideInDown">
                <div className="modal-header">
                    <Link to="/admin/news" className="modal-closer">
                        <span className="material-symbols-outlined close-admin">
                            close
                        </span>
                    </Link>
                </div>
                <div className="container content-modal">
                    <div className="formulario-agregar-noticia">
                        <h2><span>FORMULARIO PARA PUBLICAR NOTICIAS</span></h2>
                        <div className="contenedor-form-modal">
                            <form className="form">
                                <div className="field-wrapper full-width">
                                    <TextField
                                        id=""
                                        name=""
                                        label="TITULO"
                                        sx={InputFilledStyleAdmin}
                                        variant="filled"
                                        fullWidth
                                    />
                                </div>
                                <div className="field-wrapper full-width">
                                    <TextField
                                        id=""
                                        name=""
                                        label="DESCRIPCIÓN"
                                        multiline
                                        minRows={9}
                                        sx={InputFilledStyleAdmin}
                                        variant="filled"
                                        fullWidth
                                    />
                                </div>
                                <div className="boton-agregar-imagen">
                                    <button
                                        type="button"
                                        className='btn btn-2'
                                    >
                                        AÑADIR IMAGEN
                                    </button>
                                </div>
                            </form>
                            <div className="botones-opciones-admin">
                                <button className="btn btn-4">
                                    GUARDAR
                                </button>
                                <button className="btn btn-3">
                                    ELIMINAR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}