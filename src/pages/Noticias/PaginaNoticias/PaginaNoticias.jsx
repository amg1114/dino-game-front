import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ListaNoticia } from "../../../partials/ListaNoticia/ListaNoticia";
import Swal from "sweetalert2";

export function PaginaNoticias() {
    const ENDPOINT_API = process.env.REACT_APP_API + "/noticias"
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        axios.get(ENDPOINT_API)
            .then(function (respuesta) {
                setNoticias(respuesta.data)
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salió mal',
                });
            })


    }, [])
    return <>
        {
            <div>
                <h2><span>DINO</span>NOTICIAS</h2>
                <ListaNoticia noticias={noticias} />
                <Outlet />
            </div>

        }
    </>
}