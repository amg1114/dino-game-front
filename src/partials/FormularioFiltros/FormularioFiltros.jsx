import { Autocomplete, TextField, createFilterOptions, styled } from "@mui/material"
import "./FormularioFiltros.css"
import { useEffect, useState } from "react"
import axios from "axios";

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

    const CssTextField = ({
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
            }
        }
    })

    return <>
        <h3>Formulario de búsqueda</h3>
        <form onSubmit={sendFormData} className="filters-form">
            <TextField
                sx={CssTextField}
                id="outlined-controlled"
                label="Buscar Juego"
                value={search}
                fullWidth
                variant="filled"
                onChange={(event) => {
                    setSearch(event.target.value);
                }}
            />
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
                renderInput={(params) => <TextField {...params} label="Categoria" variant="filled" sx={{...CssTextField, width: '40%'}} />}
            />
            <TextField label="Precio" variant="filled" type="number" sx={{...CssTextField, width: '40%'}} value={precio} onChange={(event)=>setPrecio(event.target.value)}/>
        </form>
    </>
}