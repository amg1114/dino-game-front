import { Accordion, AccordionDetails, AccordionSummary, Button, TextField, Typography } from "@mui/material";
import { FormVersiones } from "./FormVersiones";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Versiones.css'

export function Versiones({ handleVersions }) {
    const [versiones, setVersiones] = useState([]);
    const [validacion, setValidacion] = useState(false);

    const handleAddVersion = (data) => {
        setVersiones(prevVersiones => [...prevVersiones, data]);
    }

    useEffect(() => {
        handleVersions(versiones)
    }, [versiones])
    const handleValidacion = (value) => {
        setValidacion(value);
    }

    return (
        <>
            <div hidden={validacion}>
                <FormVersiones
                    handleAddVersion={handleAddVersion}
                    handleValidacion={handleValidacion}
                />
            </div>
            <div className="boton-agregar">
                <Link className="btn btn-4" onClick={() => { setValidacion(false) }}>
                    AGREGAR VERSION
                </Link>
            </div>
            <p className="spantext-versiones"> • LA ULTIMA VERSION SERÁ LA QUE EL USUARIO PODRA DESCARGAR DESDE LA TIENDA</p>

            {versiones.map((version, index) => (
                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{`Version ${version.version}`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <h3><span>VERSIÓN {version.version}</span></h3>
                            <h4>#{version.numero}</h4>
                            <h4>TAMAÑO: {version.size}</h4>
                            <h4>URL: {version.url}</h4>
                            <h4>FECHA DE LANZAMIENTO: {version.fechaLanzamiento}</h4>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    );
}
