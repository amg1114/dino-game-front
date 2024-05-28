import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import axios from "axios";
import Swal from "sweetalert2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AssetsForm from "../../../../../components/assetsForm/AssetsForm";

import { InputFilledStyleAdmin } from "../../../../../utils/mui.styles-admin";

import './VistaFormNews.css'
import { asyncUploadFile } from "../../../../../services/assets-service";

export function VistaFormNews() {
    const navigate = useNavigate();
    const [assets, setAssets] = useState([])
    const [noticia, setNoticia] = useState({
        titulo: '',
        descripcion: '',
    })

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

    const handleChange = (field, value) => {
        setNoticia({
            ...noticia,
            [field]: value
        })
    }

    const handleAssetChange = (asset) => {
        setAssets([...assets, asset]);
    }

    const handleAssetDelete = (id) => {
        setAssets(assets.filter(asset => asset.id !== id));
    }

    const handleAssetReset = () => {
        setAssets([]);
    }

    const handleAssetUpload = (ownerID) => {
        let assetToUpload = assets;

        assetToUpload.forEach((asset, i) => {
            asset.ownerId = ownerID;
            asset.type = 'noticia';
            asset.index = i;

            asyncUploadFile(asset, (percentage) => {
                if (percentage === 100) {
                    asset.state = 'completed';
                } else {
                    asset.state = 'in_progress';
                }
            }, () => {
                asset.state = 'completed'
                handleUploadComplete()
            }, (err) => console.error(err))
        })

        setAssets(assetToUpload);
    }

    const handleUploadComplete = () => {
        if (!assets.some(asset => asset.state !== 'completed')) {
            Swal.fire({
                icon: 'success',
                title: 'Noticia publicada',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate(window.location.pathname === '/dashboard/noticias/form'? '/dashboard/noticias' : '/admin/noticias')
            })
        }
    }

    const handleSave = () => {
        if (noticia.titulo && noticia.descripcion && assets.length > 0) {
            axios.post(`${process.env.REACT_APP_API}/noticias`, { ...noticia, fecha: new Date() })
                .then((response) => {
                    handleAssetUpload(response.data.id)
                })
                .catch((error) => {
                    console.log(error)
                })
            return
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son requeridos',
            })
        }

    }

    const handleCancelar = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/admin/noticias')
            }
        })
    }

    return <>
        <div className="modal-fade animate__animated animate__fadeIn">
            <div className="modal-content modal-content-admin animate__animated animate__slideInDown">
                <div className="modal-header">
                    <Link to={window.location.pathname === '/dashboard/noticias/form'? '/dashboard/noticias' : '/admin/noticias'} className="modal-closer color-gray">
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
                                assets={assets}
                                maxFiles={1}
                                onChange={(asset) => handleAssetChange(asset)}
                                onDelete={(id) => handleAssetDelete(id)}
                                onReset={() => handleAssetReset()}
                            />
                            <div className="botones-opciones-admin">
                                <button className="btn btn-4" onClick={() => handleSave()}>
                                    GUARDAR
                                </button>
                                <button className="btn btn-5" onClick={() => handleCancelar()}>
                                    CANCELAR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}