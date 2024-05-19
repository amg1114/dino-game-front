import { useState } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import axios from "axios";
import Swal from "sweetalert2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AssetsForm from "../../../../../components/assetsForm/AssetsForm";

import { InputFilledStyleAdmin } from "../../../../../utils/mui.styles-admin";
import { useAuth } from "../../../../../providers/AuthProvider";

import './VistaFormNews.css'

export function VistaFormNews() {
    const editorConfiguration = {
        toolbar: [
            'undo',
            'redo',
            '|',
            'heading',
            'bold',
            'italic',
            'link',
            '|',
            'bulletedList',
            'numberedList',

        ]
    }

    const [noticia, setNoticia] = useState({
        titulo: '',
        descripcion: '',
    })

    const [assetsFormConfig, setAssetsFormConfig] = useState({
        canSend: false,
        ownerId: null,
        path: 'noticias',
        maxFiles: 1,
    })

    const handleChange = (field, value) => {
        setNoticia({
            ...noticia,
            [field]: value
        })
    }

    const handleSave = () => {
        if (noticia.titulo && noticia.descripcion) {
            axios.post(`${process.env.REACT_APP_API}/noticias`, {...noticia, fecha: new Date()})
                .then((response) => {
                    console.log("Se ha guardado la noticia correctamente")
                    const id = response.data.id
                    setAssetsFormConfig({
                        ...assetsFormConfig,
                        canSend: true,
                        ownerId: id
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
            return
        }else {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son requeridos',
            })
        }

    }



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
                                        id="titulo"
                                        name="titulo"
                                        label="Titulo"
                                        sx={InputFilledStyleAdmin}
                                        variant="filled"
                                        fullWidth
                                        value={noticia.titulo}
                                        onChange={(event) => {
                                            handleChange('titulo', event.target.value)
                                        }}
                                    />
                                </div>
                                <div className="field-wrapper full-width">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={editorConfiguration}
                                        data="<p>Contenido de la Noticia</p>"
                                        onChange={(event, editor) => {
                                            handleChange('descripcion', editor.getData())
                                        }}
                                    />
                                </div>
                            </form>
                            <AssetsForm
                                config={assetsFormConfig}
                            />
                            <div className="botones-opciones-admin">
                                <button className="btn btn-4" onClick={()=>handleSave()}>
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