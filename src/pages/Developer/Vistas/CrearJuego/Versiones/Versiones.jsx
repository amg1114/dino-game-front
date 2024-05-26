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
        console.log('ESTE ES EL CONSOLE LOG QUE ESTA EN VERSIONES.JSX QUE SE GENERA CADA QUE LAS VERSIONES SE AGREGAN'+versiones)
    }, [versiones])
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
                        <Typography>
                            <h3><span>VERSIÓN {version.version}</span></h3>
                            <h4>#{version.descripcion}</h4>
                            <h4>TAMAÑO: {version.size}</h4>
                            <h4>URL: {version.url}</h4>
                            <h4>FECHA DE LANZAMIENTO: {version.releaseDate}</h4>
                            <h4>REQUISITOS:</h4>
                            <ul>{version.requisitos.map((requisito, i) => {return <li key={"requisito " + i + " de la version "+ version.version}>{requisito}</li>})}</ul>
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
            <div className="boton-agregar">
                <Link className="btn btn-4" onClick={() => { setValidacion(false) }}>
                    AGREGAR VERSION
                </Link>
            </div>

        </>
    );
}
