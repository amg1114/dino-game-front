import { TextField } from "@mui/material";
import { useState } from "react";
import { InputFilledStyleAdmin } from "../../../../../utils/mui.styles-admin";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export function FormVersiones({ handleAddVersion, handleValidacion }) {
    const [data, setData] = useState({
        version: '',
        numero: '',
        size: '',
        url: '',
        fechaLanzamiento: '',
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    }
    const submitVersion = () => {

        if (Object.values(data).every(valor => valor !== "")) {
            handleAddVersion(data);
            handleValidacion(true);
            setData({
                version: '',
                numero: '',
                size: '',
                url: '',
                fechaLanzamiento: '',
            })
        } else {
            Swal.fire({
                title: 'INCOMPLETO',
                text: 'Llena todos los campos para agregar la version',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }
    return <>
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
                        id="numero"
                        name="numero"
                        type="number"
                        value={data.numero}
                        onChange={handleChange}
                        sx={InputFilledStyleAdmin}
                        fullWidth
                        variant="filled"
                        label='NUMERO'
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
                        id="fechaLanzamiento"
                        name="fechaLanzamiento"
                        type="date"
                        value={data.fechaLanzamiento}
                        onChange={handleChange}
                        sx={InputFilledStyleAdmin}
                        fullWidth
                        variant="filled"
                        label='FECHA DE LANZAMIENTO'
                    />
                </div>
                <Link className="btn btn-2" onClick={submitVersion}>
                    AÑADIR
                </Link>
            </form>
        </div>
    </>
}