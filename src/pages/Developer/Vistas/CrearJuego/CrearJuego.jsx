import { useEffect, useState } from 'react';
import './CrearJuego.css'
import Swal from 'sweetalert2';
import { Informacion } from './Informacion/Informacion';
import { Imagenes } from './Imagenes/Imagenes';
import { Versiones } from './Versiones/Versiones';
import { Confirmar } from './Confirmar/Confrimar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../../../../services/assets-service';
export function CrearJuego() {

    const navigate = useNavigate()

    //VARIABLES DE ESTADO
    const [value, setValue] = useState(0)
    const [datos, setDatos] = useState({
        titulo: "",
        descripcion: "",
        categorias: [],
        precio: ""
    })
    const [assets, setAssets] = useState([])
    const [versions, setVersions] = useState([])
    const [juego, setJuego] = useState([])


    // CONTROLAR EL CAMBIO DE TAB
    const handleChangetab = (newValue) => {
        if (!validateDatos(value)) {
            Swal.fire({
                title: 'INCOMPLETO',
                text: 'TODOS LOS CAMPOS SON OBLIGATORIOS PARA AVANZAR',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        } else {
            if (value === 0) {
                axios.post(`${process.env.REACT_APP_API}/video-games`, { ...datos, fechaLanzamiento: new Date() })
                    .then((respuesta) => {
                        setJuego(respuesta.data);
                        setValue(newValue);
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Algo salió mal',
                        });
                        console.log(error)
                    })
            } else if (value === 1) {
                if (assets.length <= 1) {
                    Swal.fire({
                        title: 'INCOMPLETO',
                        text: 'AGREGRE MINIMO 2 IMAGENES',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                } else {
                    handleAssetUpload(juego.id)
                }
            } else if (value === 2) {
                versions.map((v, index) => {
                    axios.post(`${process.env.REACT_APP_API}/video-games/${juego.id}/versions`, v)
                })
                setValue(newValue)
            }
        }
    };
    const validateDatos = (currentTab) => {
        if (currentTab === 0) {
            return Object.values(datos).every(valor => valor !== "") && datos.categorias.length > 0
        } else if (currentTab === 1) {
            return assets.length > 0;
        } else if (currentTab === 2) {
            return versions.length > 0;
        }
        return true;
    }

    //CONTROLAR LA INFORMACION DEL JUEGO
    const handleChange = (event) => {
        const { name, value } = event.target;
        setDatos(prevDatos => ({ ...prevDatos, [name]: value }));
    }

    //CONTROLAR LOS ASSETS DEL JUEGO
    const handleAssetChange = (new_assets) => {
        setAssets([...assets, ...new_assets]);
    }

    const handleAssetDelete = (id) => {
        setAssets(assets.filter(asset => asset.id !== id));
    }

    const handleAssetReset = () => {
        setAssets([]);
    }

    const handleAssetUpload = (ownerID) => {
        Swal.fire({
            title: 'Subiendo imagenes',
            text: 'Por favor espere',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })

        const promises = assets.map(async (asset, i) => {
            asset.ownerId = ownerID;
            asset.type = 'video-games';
            asset.index = i;
            asset.state = 'in_progress';

            return await uploadFile(asset, (percentage) => {
                if (percentage === 100) {
                    asset.state = 'completed';
                }
            });
        })

        Promise.all(promises).then(() => {
            Swal.close();
            setValue(2);
        }).catch((err) => {
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal',
            })
            console.error('ERROR', err)
        });

    }

    // CONTROLAR LAS VERSIONES DEL JUEGO
    const handleVersions = (versiones) => {
        setVersions(versiones)
    }

    // CONTROLAR GUARDAR Y ELIMINAR
    const handleGuardar = () => {
        Swal.fire({
            title: '¿Estás seguro de Publicar este  juego?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/dashboard')
                setDatos({
                    titulo: "",
                    descripcion: "",
                    categorias: [],
                    precio: ""
                });
                setAssets([]);
                setJuego([]);
                setVersions([]);
                setValue(0)
            } else if (result.isDismissed) {
                setValue(0)
            }
        })
    }

    const handleEliminar = () => {
        Swal.fire({
            title: '¿Estás seguro de Eliminar el juego?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API}/video-games/${juego.id}`)
                    .then(() => {
                        console.log('EL JUEGO HA SIDO ELIMINADO')
                        setDatos({
                            titulo: "",
                            descripcion: "",
                            categorias: [],
                            precio: ""
                        });
                        setAssets([]);
                        setJuego([]);
                        setVersions([]);
                        setValue(0);
                        navigate('/dashboard')
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Algo salió mal',
                        });
                        console.log(error)
                    })

                navigate('/dashboard')
            } else if (result.isDismissed) {
                setValue(0)
            }
        })
    }
    return <>
        <div>
            <div className='container-tabs'>
                <h3 className={value === 0 ? 'title-tab decoration' : 'title-tab no-decoration'}>INFORMACIÓN</h3>
                <h3 className={value === 1 ? 'title-tab decoration' : 'title-tab no-decoration'}>IMAGENES</h3>
                <h3 className={value === 2 ? 'title-tab decoration' : 'title-tab no-decoration'}>VERSION</h3>
                <h3 className={value === 3 ? 'title-tab decoration' : 'title-tab no-decoration'}>CONFIRMACIÓN</h3>
            </div>
            <div hidden={value !== 0}>
                <Informacion datos={datos} handleChange={handleChange} />
            </div>
            <div hidden={value !== 1}>
                <div className='content-tab'>
                    <Imagenes assets={assets}
                        handleAssetChange={handleAssetChange}
                        handleAssetReset={handleAssetReset}
                        handleAssetDelete={handleAssetDelete}
                    />
                </div>
            </div>
            <div hidden={value !== 2}>
                <div className='content-tab'>
                    <Versiones versions={versions} handleVersions={handleVersions} />
                </div>
            </div>
            <div hidden={value !== 3}>
                <div className='content-tab'>
                    <Confirmar datos={datos} versions={versions} />
                </div>
            </div>
            <div className='botones'>
                {
                    value <= 2 ?
                        <button className='btn btn-4' onClick={() => handleChangetab(value + 1)}>
                            SIGUIENTE
                        </button>
                        :
                        <button className='btn btn-4' onClick={() => { handleGuardar() }}>
                            GUARDAR
                        </button>
                }
                <button className='btn btn-3' onClick={() => { handleEliminar() }}>
                    ELIMINAR
                </button>
            </div>
        </div>
    </>
}