import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { CardNotice } from "../../../components/Noticias/CardNoticia";

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

    return <>
        {noticias === null ? <></> : (
            <div>
                <ul>
                    {noticias.map((elemento, index) => {
                        return (

                            <li>
                                    <CardNotice
                                        image={elemento.assets[0].url}
                                        title={elemento.titulo}
                                        description={elemento.descripcion}
                                        url={("/noticias/" + elemento.id)}
                                        NoticePage={elemento.fecha}
                                        key={index}
                                    />

                            </li>
                        )
                    })}
                </ul>
                <Outlet />
            </div>
        )
        }
    </>
}