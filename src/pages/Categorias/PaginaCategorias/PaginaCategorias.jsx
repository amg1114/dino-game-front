import { Outlet } from "react-router-dom";
import './PaginaCategorias.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { GameSectionList } from "../../../partials/GameSectionList/GameSectionList";
import Swal from "sweetalert2"
export function PaginaCategorias() {

    const ENDPOINT = process.env.REACT_APP_API + "/categorias"

    const [categorias, setCategorias] = useState([]);

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
            })
    }, [])

    return <>
        {
            categorias === null ? <></> : (
                <div>
                    {
                        categorias.map((categoria,index) => {
                            return(<GameSectionList
                                key={index}
                                games={categoria.videoGames}
                                sectionTitle={(categoria.titulo).toUpperCase()}
                                id={categoria.id}
                            />)
                        })
                    }
                    
                </div>
            )
        }
    </>
}