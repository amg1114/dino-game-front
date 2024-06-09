import './gameCard.css'

import { Link } from 'react-router-dom'
import { useAuth } from '../../providers/AuthProvider'

export function GameCard({ Game }) {
    const { assets, titulo, descripcion, id, descuentos, precio } = Game
    const { biblioteca } = useAuth()

    return <>
        <div className='gameCardSection'>
            {assets[0] ?
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
                <Link to={"/juegos/" + id} className='stretched-link'>{titulo}</Link>
            </div>
            <span className="btn btn-1 precio">{
                   biblioteca.length && biblioteca.find((game) => game.videoGame.id === id) ? "ADQUIRIDO" :
                   precio === 0 ? "GRATIS" : 
                   descuentos && descuentos.length && !biblioteca.length ? `$${precio} - ${descuentos[0].porcentaje * 100}%` :
                    "$" +precio
                }</span>
        </div>
    </>
}
