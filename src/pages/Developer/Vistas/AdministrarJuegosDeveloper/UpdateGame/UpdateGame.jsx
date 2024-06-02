import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import './UpdateGame.css';
import axios from "axios";
import { InfoUpdateGame } from "./InfoUpdateGame/InfoUpdateGame";
import { AddVersions } from "./AddVersions/AddVersions";
import { ConfirmarUpdate } from "./ConfirmarUpdate/ConfirmarUpdate";
import Swal from "sweetalert2";
import { CreateAssetsForm } from "../../../../../components/Forms/CreateAssetsForm/CreateAssetsForm";
import { uploadFile, deleteFile } from "../../../../../services/assets-service";

export function UpdateGame() {
    const { handleRender } = useOutletContext();
    const { id } = useParams();
    const [value, setValue] = useState(0);
    const [datos, setDatos] = useState(({
        titulo: '',
        descripcion: '',
        precio: '',
        categorias: []
    }));
    const [datosOriginales, setDatosOriginales] = useState(null);
    const [versions, setVersions] = useState([]);
    const [prevVersions, setPrevVersions] = useState([])
    const [assets, setAssets] = useState([])
    const [hasChanges, setHasChanges] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/video-games/${id}`)
            .then((respuesta) => {
                const { assets, ...datos } = respuesta.data
                setDatos({
                    titulo: respuesta.data.titulo,
                    descripcion: respuesta.data.descripcion,
                    precio: respuesta.data.precio,
                    categorias: respuesta.data.categorias
                });
                setDatosOriginales({
                    titulo: respuesta.data.titulo,
                    descripcion: respuesta.data.descripcion,
                    precio: respuesta.data.precio,
                    categorias: respuesta.data.categorias
                });
                setPrevVersions(respuesta.data.versions)

                setAssets(assets.map((asset) => ({
                    id: asset.assetID,
                    name: asset.asset.title,
                    url: asset.asset.url,
                    state: 'uploaded'
                })))

                setHasChanges(false)

            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

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

    const handleAssetUpload = async () => {
        const promises = assets.map(async (asset, index) => {
            if (asset.state === 'to_delete') {
                return await deleteFile({ ...asset, type: 'video-games', ownerId: id, file: { name: asset.name } })
            } else if (asset.state === 'pending') {
                return await uploadFile({ ...asset, ownerId: id, type: 'video-games', index }, (percentage) => {
                    if (percentage === 100) {
                        asset.state = 'completed';
                    } else {
                        asset.state = 'in_progress';
                    }
                })
            }
        })

        return Promise.all(promises)
    }

    const handleChange = (event) => {
        if (event !== undefined) {
            const { name, value } = event.target;
            setDatos(prevDatos => ({ ...prevDatos, [name]: value }))
        }
    };

    const handleVersions = (versiones) => {
        setVersions(versiones);
    };

    const handleNext = () => {
        if (value === 2 && JSON.stringify(datos) === JSON.stringify(datosOriginales) && versions.length === 0 && hasChanges === false) {
            Swal.fire({
                title: 'SIN ACTUALIZACIONES',
                text: 'NO HA REALIZADO NINGUN CAMBIO',
                icon: 'error'
            }).then(() => setValue(2));
        } else {
            setValue(prevValue => Math.min(prevValue + 1, 3));
        }
    };

    const handleBack = () => {
        setValue(prevValue => Math.max(prevValue - 1, 0));
    };

    const handleSave = () => {
        let promises = [];
        if (JSON.stringify(datos) !== JSON.stringify(datosOriginales)) {
            promises.push(axios.patch(`${process.env.REACT_APP_API}/video-games/${id}`,
                {
                    titulo: datos.titulo,
                    descripcion: datos.descripcion,
                    precio: datos.precio,
                    categorias: datos.categorias.map(categoria => categoria.id)
                }
            ))
        }

        if (versions.length > 0) {
            versions.map((version) => {
                promises.push(axios.post(`${process.env.REACT_APP_API}/video-games/${id}/versions`, version))
            })
        }

        if (hasChanges) {
            promises.push(handleAssetUpload())
        }

        Swal.fire({
            title: 'ACTUALIZANDO JUEGO',
            text: 'Por favor espere',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });
        
        Promise.all(promises)
            .then(() => {
                Swal.close()
                Swal.fire({
                    title: 'ACTUALIZACIÓN EXITOSA',
                    icon: 'success',
                    timer: 2000,
                }).then(() => {
                    handleRender()
                    navigate('/dashboard')
                })
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    title: 'ERROR',
                    text: 'NO SE PUDO ACTUALIZAR EL JUEGO',
                    icon: 'error'
                })
            });

    }

    return (
        <>
            {datos === null ? null : (
                <div className="modal-fade animate__animated animate__fadeIn">
                    <div className="modal-content-admin modal-update animate__animated animate__slideInDown">
                        <div className="modal-header">
                            <Link to="/dashboard" className="modal-closer-admin">
                                <span className="material-symbols-outlined">
                                    close
                                </span>
                            </Link>
                        </div>
                        <div className="container-modal-update">
                            <div className='container-tabs container-tabs-update'>
                                <h3 className={value === 0 ? 'title-tab decoration' : 'title-tab no-decoration'} onClick={() => setValue(0)}>INFORMACIÓN</h3>
                                <h3 className={value === 1 ? 'title-tab decoration' : 'title-tab no-decoration'} onClick={() => setValue(1)}>VERSIONES</h3>
                                <h3 className={value === 2 ? 'title-tab decoration' : 'title-tab no-decoration'} onClick={() => setValue(2)}>ASSETS</h3>
                                <h3 className={value === 3 ? 'title-tab decoration' : 'title-tab no-decoration'} onClick={() => setValue(3)}>CONFIRMACIÓN</h3>
                            </div>
                            <div hidden={value !== 0}>
                                {datos.categorias === undefined ? null : (
                                    <InfoUpdateGame datos={datos} handleChange={handleChange} prevCategorias={datos.categorias} />
                                )}
                            </div>
                            <div hidden={value !== 1}>
                                {prevVersions === undefined ? null : (
                                    <AddVersions handleVersions={handleVersions} versionesPrev={prevVersions} />
                                )}
                            </div>
                            <div hidden={value !== 2}>
                                <CreateAssetsForm
                                    assets={assets}
                                    maxFiles={5}
                                    onChange={(asset) => handleAssetChange(asset)}
                                    onDelete={(id) => handleAssetDelete(id)}
                                    onReset={() => { setAssets([]) }}
                                />
                            </div>
                            <div hidden={value !== 3}>
                                <ConfirmarUpdate datos={datos} versions={versions} prevVersion={prevVersions} assets={assets} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                                    {value === 0 ? <></> : <button className="btn btn-4" onClick={() => handleBack()}>ATRAS</button>}
                                    {value === 3 ? <></> : <button className="btn btn-4" onClick={() => handleNext()}>SIGUIENTE</button>}
                                </div>
                                <div hidden={value !== 3}>
                                    <button onClick={() => handleSave()} className="btn btn-4" >GUARDAR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
