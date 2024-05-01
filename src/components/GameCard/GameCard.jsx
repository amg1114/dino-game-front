import { Link } from 'react-router-dom'
import './gameCard.css'

export function GameCard({ Game }) {
    const { assets, titulo, descripcion, id, precio } = Game
    return (
        <div className='gameCardSection'>
            <figure>
                <img className="gameImage"
                    src={assets[0].url}
                    alt={titulo + " imagen"}
                />
            </figure>

            <div className='description'><p>{descripcion.slice(0, 100)}</p></div>

            <div className="urlGame">
                <Link>{titulo}</Link>
            </div>
            
            <span className="btn btn-1 precio">${precio}</span>
        </div>
    )
}
