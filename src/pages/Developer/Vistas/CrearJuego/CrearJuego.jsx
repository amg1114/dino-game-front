import { useEffect, useState } from 'react';
import './CrearJuego.css'
import Swal from 'sweetalert2';
import { Informacion } from './Informacion/Informacion';
import { Imagenes } from './Imagenes/Imagenes';
import { Versiones } from './Versiones/Versiones';
import { Confirmar } from './Confirmar/Confrimar';

export function CrearJuego() {

    //VARIABLES DE ESTADO
    const [value, setValue] = useState(0)
    const [datos, setDatos] = useState({
        titulo: "",
        descripcion: "",
        categoria: "",
        precio: ""
    })
    const [assets, setAssets] = useState([])
    const [versions, setVersions] = useState([])


    // CONTROLAR EL CAMBIO DE TAB
    const handleChangetab = (newValue) => {

        !(validateDatos(value)) ?
            Swal.fire({
                title: 'INCOMPLETO',
                text: 'TODOS LOS CAMPOS SON OBLIGATORIOS PARA AVANZAR',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
            :
            setValue(newValue)
    };
    const validateDatos = (currentTab) => {
        if (currentTab === 0) {
            return Object.values(datos).every(valor => valor !== "");
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
    const handleAssetChange = (asset) => {
        setAssets([...assets, asset]);
    }

    const handleAssetDelete = (id) => {
        setAssets(assets.filter(asset => asset.id !== id));
    }

    const handleAssetReset = () => {
        setAssets([]);
    }

    // CONTROLAR LAS VERSIONES DEL JUEGO
    const handleVersions = (versiones) => {
        setVersions(versiones)
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
                    <Confirmar datos={datos} versions={versions}/>
                </div>
            </div>
            <div className='botones'>
                {
                    value <= 2 ?
                        <>
                            <button className='btn btn-4' onClick={() => handleChangetab(value + 1)}>
                                SIGUIENTE
                            </button>

                        </> :
                        <button className='btn btn-4'>
                            GUARDAR
                        </button>
                }
                <button className='btn btn-3'>
                    ELIMINAR
                </button>

            </div>

        </div>
    </>
}