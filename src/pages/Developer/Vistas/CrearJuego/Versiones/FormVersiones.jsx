import { TextField } from "@mui/material";
import { useState } from "react";
import { InputFilledStyleAdmin } from "../../../../../utils/mui.styles-admin";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export function FormVersiones({ handleAddVersion, handleValidacion }) {
    const [data, setData] = useState({
        version: '',
        descripcion: '',
        size: '',
        url: '',
        releaseDate: '',
        requisitos: []
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'requisitos') {
            const requisitosArray = value.split(',').map(requisito => requisito.trim());
            setData(prevData => ({ ...prevData, [name]: requisitosArray }));
        } else {
            setData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const submitVersion = () => {
        if (Object.values(data).every(valor => Array.isArray(valor) ? valor.length > 0 : valor !== "")) {
            handleAddVersion(data);
            handleValidacion(true);
            setData({
                version: '',
                descripcion: '',
                size: '',
                url: '',
                releaseDate: '',
                requisitos: []
            });
        } else {
            Swal.fire({
                title: 'INCOMPLETO',
                text: 'Llena todos los campos para agregar la versión',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <>
            <div className="form-versions">
                <h3><span>VERSION DEL JUEGO</span></h3>
                <form className="form">
                    <div className="field-wrapper full-width">
                        <TextField
                            id="version"
                            name="version"
                            value={data.version}
                            onChange={handleChange}
                            sx={InputFilledStyleAdmin}
                            fullWidth
                            variant="filled"
                            label='VERSION'
                        />
                    </div>
                    <div className="field-wrapper full-width">
                        <TextField
                            id="descripcion"
                            name="descripcion"
                            value={data.descripcion}
                            onChange={handleChange}
                            sx={InputFilledStyleAdmin}
                            fullWidth
                            variant="filled"
                            label='DESCRIPCION'
                        />
                    </div>
                    <div className="field-wrapper full-width">
                        <TextField
                            id="size"
                            name="size"
                            value={data.size}
                            onChange={handleChange}
                            sx={InputFilledStyleAdmin}
                            fullWidth
                            variant="filled"
                            label='TAMAÑO'
                        />
                    </div>
                    <div className="field-wrapper full-width">
                        <TextField
                            id="url"
                            name="url"
                            value={data.url}
                            onChange={handleChange}
                            sx={InputFilledStyleAdmin}
                            fullWidth
                            variant="filled"
                            label='URL'
                        />
                    </div>
                    <div className="field-wrapper full-width">
                        <TextField
                            id="releaseDate"
                            name="releaseDate"
                            type="date"
                            value={data.releaseDate}
                            onChange={handleChange}
                            sx={InputFilledStyleAdmin}
                            fullWidth
                            variant="filled"
                            label='FECHA DE LANZAMIENTO'
                        />
                    </div>
                    <div className="field-wrapper full-width">
                        <TextField
                            id="requisitos"
                            name="requisitos"
                            value={data.requisitos.join(', ')}
                            onChange={handleChange}
                            sx={InputFilledStyleAdmin}
                            fullWidth
                            variant="filled"
                            label='REQUISITOS (separados por comas)'
                            helperText="Ingrese los requisitos separados por comas"
                        />
                    </div>
                    <Link className="btn btn-2" onClick={submitVersion}>
                        AÑADIR
                    </Link>
                </form>
            </div>
        </>
    );
}
