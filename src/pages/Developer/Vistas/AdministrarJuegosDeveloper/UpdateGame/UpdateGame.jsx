import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './UpdateGame.css';
import axios from "axios";
import { InfoUpdateGame } from "./InfoUpdateGame/InfoUpdateGame";
import { AddVersions } from "./AddVersions/AddVersions";
import { ConfirmarUpdate } from "./ConfirmarUpdate/ConfirmarUpdate";
import Swal from "sweetalert2";

export function UpdateGame() {
    const { id } = useParams();
    const [value, setValue] = useState(0);
    const [datos, setDatos] = useState(null);
    const [datosOriginales, setDatosOriginales] = useState(null);
    const [versions, setVersions] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/video-games/${id}`)
            .then((respuesta) => {
                setDatos(respuesta.data);
                setDatosOriginales(respuesta.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDatos(prevDatos => ({ ...prevDatos, [name]: value }));
    };

    const handleVersions = (versiones) => {
        setVersions(versiones);
    };

    const handleNext = () => {
        if (value === 1 && JSON.stringify(datos) === JSON.stringify(datosOriginales) && versions.length === 0) {
            Swal.fire({
                title: 'SIN ACTUALIZACIONES',
                text: 'NO HA REALIZADO NINGUN CAMBIO',
                icon: 'error'
            }).then(() => setValue(1));
        } else {
            setValue(prevValue => Math.min(prevValue + 1, 2));
        }
    };

    const handleBack = () => {
        setValue(prevValue => Math.max(prevValue - 1, 0));
    };

    const handleSave = () => {
        if(JSON.stringify(datos) !== JSON.stringify(datosOriginales)){
            axios.patch(`${process.env.REACT_APP_API}/video-games/${id}`)
            .then((respuesta) => {
                console.log(respuesta.data)
            })
        }
        if(versions.length > 0){
            versions.map((version) => {
                axios.post(`${process.env.REACT_APP_API}/video-games/${id}/versions`, version)
                .then(() => console.log('VERSION AGREGADA: ' + version))
            })
        }
        navigate('/dashboard')
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
                                <h3 className={value === 2 ? 'title-tab decoration' : 'title-tab no-decoration'} onClick={() => setValue(2)}>CONFIRMACIÓN</h3>
                            </div>
                            <div hidden={value !== 0}>
                                {datos.categorias === undefined ? null : (
                                    <InfoUpdateGame datos={datos} handleChange={handleChange} prevCategorias={datos.categorias} />
                                )}
                            </div>
                            <div hidden={value !== 1}>
                                {datos.versions === undefined ? null : (
                                    <AddVersions handleVersions={handleVersions} versionesPrev={datos.versions} />
                                )}
                            </div>
                            <div hidden={value !== 2}>
                                <ConfirmarUpdate datos={datos} versions={versions} prevVersion={datos.versions} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <button className="btn btn-4" onClick={() => handleBack()} disabled={value === 0}>ATRAS</button>
                                    <button className="btn btn-4" onClick={() => handleNext()} disabled={value === 2}>SIGUIENTE</button>
                                </div>
                                <div hidden={value !== 2}>
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
