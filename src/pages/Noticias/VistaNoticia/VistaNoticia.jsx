import { Link } from "react-router-dom"
import "../../../css/modal/index.css"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect,  useState } from "react"


export function VistaNoticia() {

    const { id } = useParams()
    const ENDPOINT = `https://dinogame.up.railway.app/api/noticias/${id}`
    const [noticia, setNoticia] = useState(null)

    useEffect(() => {
        axios.get(ENDPOINT)
            .catch(function (error) {
                console.log(error)
            })
            .then(function (response) {
                setNoticia(response.data);
            })
    }

    )

    return <>
        {
            noticia === null ? <></> : (
                <div className="modal-fade animate__animated animate__fadeIn">
                    <div className="modal-content animate__animated animate__slideInDown">
                        <div className="modal-header">
                            <Link to="/juegos" className="modal-closer">
                                <span className="material-symbols-outlined">
                                    close
                                </span>
                            </Link>
                        </div>
                        <div className="izquierda">
                            <img src={noticia.assets[0].url} alt="imagen_juego" />
                            <h2>{noticia.titulo}</h2>
                            <p>{noticia.descripcion}</p>
                        </div>
                        <div className="derecha">

                        </div>
                    </div>
                </div>)
        }
    </>
}