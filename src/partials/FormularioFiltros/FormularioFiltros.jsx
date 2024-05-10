import { Autocomplete, TextField, createFilterOptions, styled } from "@mui/material"
import "./FormularioFiltros.css"
import { useEffect, useState } from "react"
import axios from "axios";
import { InputFilledStyle } from "../../utils/mui.styles"; 
export function FormularioFiltros({ onSearch }) {
    const API_ENPOINT = process.env.REACT_APP_API + '/categorias'
    const [categorias, setCategorias] = useState([]);

    const [search, setSearch] = useState('');
    const [categoria, setCategoria] = useState(null);
    const [precio, setPrecio] = useState(0);

    useEffect(() => {
        if (!categorias.length) {
            axios.get(API_ENPOINT).then((res) => {
                setCategorias(res.data)
            })
        }
        sendFormData()
    }, [search, categoria, precio])

    const sendFormData = () => {
        const data = {
            search,
            categoria,
            precio
        }
        onSearch(data)
    }

    return <>
        <h3>Formulario de búsqueda</h3>
        <form onSubmit={sendFormData} className="filters-form">
            <TextField
                sx={InputFilledStyle}
                id="outlined-controlled"
                label="Buscar Juego"
                value={search}
                fullWidth
                variant="filled"
                onChange={(event) => {
                    setSearch(event.target.value);
                }}
            />
                    <div className="field-wrapper">
                        <TextField label="Precio" fullWidth variant="filled" type="number" sx={InputFilledStyle} value={precio} onChange={(event) => setPrecio(event.target.value)} />
                    </div>
            <div className="field-wrapper">
                <Autocomplete
                    id="combo-box-demo"
                    options={categorias}
                    filterOptions={createFilterOptions({
                        matchFrom: 'start',
                        stringify: (opt) => opt.titulo
                    })}
                    getOptionLabel={(opt) => opt.titulo}
                    getOptionKey={(opt) => opt.id}
                    value={categoria}
                    onChange={(event, value) => {
                        setCategoria(value)
                    }}
                    renderInput={(params) => <TextField {...params} label="Categoria" variant="filled" sx={InputFilledStyle} />}
                />
            </div>
        </form>
    </>
}