import axios from 'axios'
import { Link } from 'react-router-dom'
import './gameCard.css'
import { useEffect, useState } from 'react'
import { useAuth } from '../../providers/AuthProvider'

export function GameCard({ Game }) {
    const { assets, titulo, descripcion, id, descuentos, precio } = Game
    const { usuario } = useAuth()
    const ENDPOINT_API = `${process.env.REACT_APP_API}/video-games/biblioteca/${id}`
    const [isAdquired, setIsAdquired] = useState(false);

    useEffect(() => {
        if (usuario) {
            axios.get(ENDPOINT_API)
                .then(function () {
                    setIsAdquired(true);
                })
        }
    }, [usuario]);

    return <>

        <div className='gameCardSection'>
            { assets[0] ? 
                <figure>
                    <img className="gameImage"
                        src={assets[0].asset.url}
                        alt={titulo + " imagen"}
                    />
                </figure> : 
                <></>
            }
            <div className='description'><p className='description-texto'>{descripcion.slice(0, 100)}</p></div>
            <div className="urlGame">
                <Link to={isAdquired ? "/perfil/biblioteca" : "/juegos/" + id} className='stretched-link'>{titulo}</Link>
            </div>
            {isAdquired ? <span className="btn btn-1 precio">ADQUIRIDO</span> : (descuentos === undefined || descuentos.length === 0) ?
                <span className="btn btn-1 precio">${precio}</span> :
                <span className="btn btn-1 precio">${precio} %{descuentos[0].porcentaje}</span>
            }
        </div>
    </>
}
