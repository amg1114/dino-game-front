import { useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import axios from "axios";
import Swal from "sweetalert2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { InputFilledStyleAdmin } from "../../../../../utils/mui.styles-admin";
import { CKEditor_CONFIG } from "../../../../../utils/constants";
import { CreateAssetsForm } from "../../../../../components/Forms/CreateAssetsForm/CreateAssetsForm";
import { uploadFile, deleteFile } from "../../../../../services/assets-service";

export function VistaUpdateNews() {
    const { id } = useParams();
    const { handleRender } = useOutletContext();

    const [noticia, setNoticia] = useState(null);
    const [updatedData, setUpdatedData] = useState(null)

    const [assets, setAssets] = useState([]);

    const [hasChanges, setHasChanges] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useState(() => {
        axios.get(`${process.env.REACT_APP_API}/noticias/${id}`)
            .then((res) => {
                const { assets, ...noticia } = res.data
                setNoticia(res.data)
                setUpdatedData(noticia)

                setAssets(assets.map((asset) => ({
                    id: asset.assetID,
                    name: asset.asset.title,
                    url: asset.asset.url,
                    state: 'uploaded'
                })))

                setHasChanges(false)
                setLoading(false)
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire({
                        title: 'Noticia no encontrada',
                        icon: 'error',
                    }).then(() => {
                        navigate(-1)
                    })

                    return;
                }
            })
    }, [id])

    const handleChange = (field, value) => {
        if (noticia[field] !== value) {
            setUpdatedData({
                ...updatedData,
                [field]: value
            })
            setHasChanges(true)
        }
    }

    const handleAssetDelete = (id) => {
        const asset = assets.find(asset => asset.id === id);
        if (asset.state === 'uploaded') {
            assets.forEach(asset => {
                if (asset.id === id) {
                    asset.state = 'to_delete'
                    return
                }
            })
        } else {
            setAssets(assets.filter(asset => asset.id !== id))
        }
        setHasChanges(true)
    }

    const handleAssetChange = (newAssets) => {
        setAssets([...assets, ...newAssets])
        setHasChanges(true)
    }

    const handleSave = () => {
        if (updatedData.titulo && updatedData.descripcion && assets.length > 0) {
            Swal.fire({
                title: 'Creando Noticia',
                html: 'Por favor espere',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            })

            axios.patch(`${process.env.REACT_APP_API}/noticias/${id}`, { ...updatedData, fecha: new Date() })
                .then((response) => {
                    handleAssetUpload()
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Algo salió mal',
                    })
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

    const handleAssetUpload = () => {
        const promises = assets.map(async (asset, index) => {
            if (asset.state === 'to_delete') {
                return await deleteFile({ ...asset, type: 'noticias', ownerId: noticia.id, file: { name: asset.name } })
            } else if (asset.state === 'pending') {
                return await uploadFile({ ...asset, ownerId: noticia.id, type: 'noticias', index }, (percentage) => {
                    if (percentage === 100) {
                        asset.state = 'completed';
                    } else {
                        asset.state = 'in_progress';
                    }
                })
            }
        })

        Promise.all(promises)
            .then(() => {
                Swal.close()
                Swal.fire({
                    icon: 'success',
                    title: 'Noticia Actualizada',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    handleRender()
                    navigate(-1)
                })
            })
            .catch((error) => {
                Swal.close()
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salió mal',
                })
            })
    }

    return <>
        {loading ? <></> :
            <div className="modal-fade animate__animated animate__fadeIn">
                <div className="modal-content modal-content-admin animate__animated animate__slideInDown">
                    <div className="modal-header">
                        <Link to="/admin/noticias" className="modal-closer color-gray">
                            <span className="material-symbols-outlined close-admin">
                                close
                            </span>
                        </Link>
                    </div>
                    <div className="container content-modal">
                        <div className="formulario-agregar-noticia">
                            <h2><span>EDITAR NOTICIA</span></h2>
                            <div className="contenedor-form-modal">
                                <form className="form">
                                    <div className="field-wrapper full-width">
                                        <TextField
                                            id="titulo"
                                            name="titulo"
                                            label="Titulo"
                                            value={updatedData.titulo}
                                            sx={InputFilledStyleAdmin}
                                            variant="filled"
                                            fullWidth
                                            onChange={(event) => {
                                                handleChange('titulo', event.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="field-wrapper full-width">
                                        <CKEditor
                                            editor={ClassicEditor}
                                            config={CKEditor_CONFIG}
                                            data={updatedData.descripcion}
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
                                    onReset={() => { setAssets([]) }}
                                />
                                <div className="botones-opciones-admin">
                                    {hasChanges ? <button className="btn btn-4" onClick={() => handleSave()}>
                                        GUARDAR
                                    </button> : <></>}
                                    <Link className="btn btn-5" onClick={() => navigate(-1)}>
                                        CANCELAR
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>
}