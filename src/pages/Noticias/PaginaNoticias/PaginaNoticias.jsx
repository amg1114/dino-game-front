import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export function PaginaNoticias() {
    const ENDPOINT_API = "https://dino-game-backend-production.up.railway.app/api/noticias"
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
    console.log (noticias)

    return <>
        <Outlet />
    </>
}