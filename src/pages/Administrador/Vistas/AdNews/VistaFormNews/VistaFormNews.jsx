import { Link } from "react-router-dom";
import './VistaFormNews.css'
import { FilledInput, TextField } from "@mui/material";
import { InputFilledStyleAdmin } from "../../../../../utils/mui.styles-admin";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AssetsForm from "../../../../../components/assetsForm/AssetsForm";
import { createRef, useState } from "react";
import Swal from "sweetalert2";

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

    const assetsRef = createRef()

    const handleChange = (field, value) => {
        setNoticia({
            ...noticia,
            [field]: value
        })
    }

    const handleSave = () => {
        if (noticia.titulo && noticia.descripcion) {
            assetsRef.current.test();
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
                                ref={assetsRef}
                                ownerId={0}
                                path={'noticias'}
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