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
        handleVersions([...versiones, data]);
    }
    const handleValidacion = (value) => {
        setValidacion(value);
    }

    return (
        <>
            <p className="spantext-versiones">LA ULTIMA VERSION SERÁ LA QUE EL USUARIO PODRA DESCARGAR DESDE LA TIENDA</p>

            {versiones.map((version, index) => (
                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{`Version ${version.version}`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component="div">
                            <h3><span>VERSIÓN {version.version}</span></h3>
                            <h4>#{version.descripcion}</h4>
                            <h4>TAMAÑO: {version.size}</h4>
                            <h4>URL: {version.url}</h4>
                            <h4>FECHA DE LANZAMIENTO: {version.releaseDate}</h4>
                            <h4>REQUISITOS:</h4>
                            {version.requisitos.map((requisito, i) => {return <h5 key={i + " requisito del acordion "+index}>{requisito}</h5>})}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
            <div hidden={validacion}>
                <FormVersiones
                    handleAddVersion={handleAddVersion}
                    handleValidacion={handleValidacion}
                />
            </div>

        </>
    );
}
