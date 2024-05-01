import { Link } from 'react-router-dom'
import './gameCard.css'

export function GameCard({ Game }) {
    const { assets, titulo, descripcion, id, precio } = Game
    return (
        <div className='contenedor-juegos'>
            <div className='contenedor-imagen'>
                <Link to={`/juegos/${id}`}>
                    <div className='gameCardSection'>
                        <img className="gameImage"
                            src={assets[1].url}
                            alt={titulo + " imagen"}
                        />


                        <div className='description'><p>{descripcion.slice(0, 100)}</p></div>
                    </div>
                </Link>
            </div>

            <div className="urlGame">
                <p>{titulo}</p>
            </div>

            <div className="btn btn-1 precio">
                <p>${precio}</p>
            </div>
        </div>
    )
}
