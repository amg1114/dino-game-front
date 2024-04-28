import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ListaNoticia } from "../../../partials/CardNoticia/ListaNoticia";

export function PaginaNoticias() {
    const ENDPOINT_API = "https://dinogame.up.railway.app/api/noticias"
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
        {noticias === null ? <></> : (
            <div>
                <ListaNoticia noticias={noticias} />
                <Outlet />
            </div>
        )
        }
    </>
}