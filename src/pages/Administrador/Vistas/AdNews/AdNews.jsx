import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ListaNoticia } from "../../../../partials/ListaNoticia/ListaNoticia";
import './AdNews.css'

export function AdNews() {
    const ENDPOINT_API = process.env.REACT_APP_API + "/noticias"
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        axios.get(ENDPOINT_API)
            .catch(function (error) {
                console.log(error)
            })
            .then(function (respuesta) {
                setNoticias(respuesta.data)
            })

    })
    return <>
        {
            <div className="noticiasPageAdmin">
                <h2><span>DINO</span>NOTICIAS</h2>
                <ListaNoticia noticias={noticias} />
                <button className="btn btn-2 boton-agregar-noticia">
                    AGREGAR NOTICIA
                </button>
                <Outlet />
            </div>
        
        }
    </>
}