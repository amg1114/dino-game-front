import './VistaFormNews.css'

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { TextField } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { CreateAssetsForm } from "../../../../../components/Forms/CreateAssetsForm/CreateAssetsForm";
import { InputFilledStyleAdmin } from "../../../../../utils/mui.styles-admin";
import { uploadFile } from "../../../../../services/assets-service";
import { CKEditor_CONFIG } from "../../../../../utils/constants";

export function VistaFormNews() {
    const navigate = useNavigate();
    const [assets, setAssets] = useState([])
    const [noticia, setNoticia] = useState({
        titulo: '',
        descripcion: '',
    })
    
    const handleChange = (field, value) => {
        setNoticia({
            ...noticia,
            [field]: value
        })
    }

    const handleAssetChange = (asset) => {
        const prevAssets = [...assets];
        setAssets([...asset, ...prevAssets]);
    }

    const handleAssetDelete = (id) => {
        setAssets(assets.filter(asset => asset.id !== id));
    }

    const handleAssetReset = () => {
        setAssets([]);
    }

    const handleAssetUpload = (ownerID) => {

        const promises = assets.map(async (asset, i) => {
            asset.ownerId = ownerID;
            asset.type = 'noticias';
            asset.index = i;
            asset.state = 'in_progress';

            return await uploadFile(asset, (percentage) => {
                if (percentage === 100) {
                    asset.state = 'completed';
                }
            })
        })


        Promise.all(promises)
            .then((response) => {
                Swal.close()
                Swal.fire({
                    icon: 'success',
                    title: 'Noticia creada con éxito',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/admin/noticias')
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salió mal',
                });
            })
    }


    const handleSave = () => {
        if (noticia.titulo && noticia.descripcion && assets.length > 0) {
            Swal.fire({
                title: 'Creando Noticia',
                html: 'Por favor espere',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            })
            axios.post(`${process.env.REACT_APP_API}/noticias`, { ...noticia, fecha: new Date() })
                .then((response) => {
                    handleAssetUpload(response.data.id)
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Algo salió mal',
                    });
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
                                        config={{ placeholder: 'Escribe el contenido de la noticia', ...CKEditor_CONFIG }}
                                        onChange={(event, editor) => {
                                            handleChange('descripcion', editor.getData())
                                        }}
                                    />
                                </div>
                            </form>
                            <CreateAssetsForm
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