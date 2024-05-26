import { Link } from 'react-router-dom'
import './gameCard.css'

export function GameCard({ Game }) {
    const { assets, titulo, descripcion, id, precio } = Game
    return (
        <div className='gameCardSection'>
            {assets[0] ? <figure>
                <img className="gameImage"
                    src={assets[0].asset.url}
                    alt={titulo + " imagen"}
                />
            </figure> : <></>}

            <div className='description'><p className='description-texto'>{descripcion.slice(0, 100)}</p></div>

            <div className="urlGame">
                <Link to={"/juegos/" + id} className='stretched-link'>{titulo}</Link>
            </div>

            <span className="btn btn-1 precio">${precio}</span>
        </div>
    )
}
