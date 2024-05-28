import axios from 'axios'
import { Link } from 'react-router-dom'
import './gameCard.css'
import { useEffect, useState } from 'react'

export function GameCard({ Game }) {
    const { assets, titulo, descripcion, id, descuentos, precio } = Game

    const ENDPOINT_API = `${process.env.REACT_APP_API}/video-games/biblioteca/${id}`
    const [validacion, setValidacion] = useState(false);

    useEffect(() => {
        console.log(descuentos)
        axios.get(ENDPOINT_API)
            .then(function () {
                setValidacion(true);
            })
    }, [validacion]
    )

    return <>

        <div className='gameCardSection'>
            {assets[0] ? <figure>
                <img className="gameImage"
                    src={assets[0].asset.url}
                    alt={titulo + " imagen"}
                />
            </figure> : <></>}

            <div className='description'><p className='description-texto'>{descripcion.slice(0, 100)}</p></div>

            {validacion ? <><div className="urlGame">
                <Link to={"/perfil/biblioteca"} className='stretched-link'>{titulo}</Link>
            </div>
                <span className="btn btn-1 precio">ADQUIRIDO</span>
            </> : <>
                <div className="urlGame">
                    <Link to={"/juegos/" + id} className='stretched-link'>{titulo}</Link>
                </div>
                {(descuentos === undefined || descuentos.length === 0) ?
                    <span className="btn btn-1 precio">${precio}</span> :
                    <span className="btn btn-1 precio">${precio} %{descuentos[0].porcentaje}</span>
                }
            </>}
        </div>
    </>
}
