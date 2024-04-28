import { Autocomplete, TextField, createFilterOptions, styled } from "@mui/material"
import "./FormularioFiltros.css"
import { useEffect, useState } from "react"
import axios from "axios";

export function FormularioFiltros({ onSearch }) {
    const API_ENPOINT = process.env.REACT_APP_API + '/categorias'
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {

        axios.get(API_ENPOINT).then((res) => {
            setCategorias(res.data)
        })
    }, [])
    const handleSearch = (e) => { }

    const CssTextField = styled(TextField)({
        fontFamily: "Teko",
        '& .MuiInputLabel-filled': {
            fontSize: "20px",
            fontFamily: "Teko",
            color: '#38A3A5',
            '&.Mui-focused': {
                color: '#57cc99'
            },
        },
        '& .MuiFilledInput-root': {
            color: '#fff',
            fontSize: "18px",
            fontFamily: "Teko",
            "&:hover:not(.Mui-focused)": {
                "&:before": {
                    borderWidth: '2px',
                    borderColor: "#57cc99",
                },
            },
            '&:before': {
                borderColor: '#38A3A5',
                borderWidth: '2px'
            },
            '&:after': {
                borderColor: '#57cc99',
                borderWidth: '2px'
            },
            '&.MuiFormControl-fullWidth)': {
                flex: 1,
                width: 'auto'
            },
            '&:not(.MuiFormControl-fullWidth)': {
                flexStroke: '0',
                minWidth: '250px'
            }
        }
    })

    return <>
        <h3>Formulario de búsqueda</h3>
        <form onSubmit={handleSearch} className="filters-form">
            <CssTextField label="Buscar" variant="filled" fullWidth />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={categorias}
                filterOptions={createFilterOptions({
                    matchFrom: 'start',
                    stringify: (opt) => opt.titulo
                })}
                getOptionLabel={(opt) => opt.titulo}
                getOptionKey={(opt) => opt.id}
                renderInput={(params) => <CssTextField {...params} label="Catgeoria" variant="filled" />}
            />
            <CssTextField label="Precio" variant="filled" type="number" />
        </form>
    </>
}