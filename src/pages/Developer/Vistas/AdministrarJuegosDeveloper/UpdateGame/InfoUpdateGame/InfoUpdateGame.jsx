import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField } from "@mui/material";
import { InputFilledStyleAdmin } from '../../../../../../utils/mui.styles-admin';
import Swal from "sweetalert2"

export function InfoUpdateGame({ datos, handleChange, prevCategorias }) {
    const ENDPOINT = process.env.REACT_APP_API + '/categorias';
    const [categorias, setCategorias] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(prevCategorias);
    const categoriasprev = prevCategorias
    useEffect(() => {
        axios.get(ENDPOINT)
            .then((respuesta) => {
                setCategorias(respuesta.data);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salió mal',
                });
                console.log(error)
            });
    }, []);

    const handleCategoryChange = (categoria) => {
        const updatedCategories = selectedCategories.some(c => c.id === categoria.id)
            ? selectedCategories.filter(c => c.id !== categoria.id)
            : [...selectedCategories, categoriasprev, categoria];

        setSelectedCategories(updatedCategories);
        handleChange({ target: { name: 'categorias', value: updatedCategories } });
    };

    const handleCategoryPrevChange = (categoria) => {
        const updatedCategories = categoriasprev.some(c => c.id === categoria.id)
            ? categoriasprev.filter(c => c.id !== categoria.id)
            : [...categoriasprev, selectedCategories, categoria];

        setSelectedCategories(updatedCategories);
        handleChange({ target: { name: 'categorias', value: updatedCategories } });
    };

    return (
        <>
            {
                categoriasprev === undefined ? <></> : (

                    categorias.length === 0 ? <></> : (
                        <div className='content-tab'>
                            <h3><span>INFORMACION DEL JUEGO</span></h3>
                            <div className="field-wrapper full-width">
                                <TextField
                                    id="titulo"
                                    name="titulo"
                                    value={datos.titulo}
                                    onChange={() => handleChange()}
                                    sx={InputFilledStyleAdmin}
                                    fullWidth
                                    variant="filled"
                                    label='TITULO'
                                />
                            </div>
                            <div className="field-wrapper full-width">
                                <TextField
                                    id="descripcion"
                                    name="descripcion"
                                    value={datos.descripcion}
                                    onChange={() => handleChange()}
                                    label="DESCRIPCION"
                                    multiline
                                    minRows={7}
                                    sx={InputFilledStyleAdmin}
                                    variant="filled"
                                    fullWidth
                                />
                            </div>
                            <div className="field-wrapper full-width">
                                <TextField
                                    id="precio"
                                    name="precio"
                                    type='number'
                                    value={datos.precio}
                                    onChange={() => handleChange()}
                                    label="PRECIO"
                                    sx={InputFilledStyleAdmin}
                                    variant="filled"
                                    fullWidth
                                />
                            </div>
                            <div className="field-wrapper full-width">
                                <label>CATEGORIAS: </label>
                                <div className="checkbox-group">
                                    {categorias.map((categoria) => (
                                        <label key={categoria.id} className="checkbox-label">
                                            {
                                                (categoriasprev.some(c => c.id == categoria.id)) ? <>
                                                    <input
                                                        type="checkbox"
                                                        checked
                                                        onChange={() => handleCategoryPrevChange(categoria)}
                                                    />
                                                    <span></span>
                                                    {categoria.titulo}

                                                </> : <>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.some(c => c.id === categoria.id)}
                                                        onChange={() => handleCategoryChange(categoria)}
                                                    />
                                                    <span></span>
                                                    {categoria.titulo}
                                                </>
                                            }
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                )
            }
        </>
    );
}
