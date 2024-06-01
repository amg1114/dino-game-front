import './gameCard.css'

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../../providers/AuthProvider'

export function GameCard({ Game }) {
    const { assets, titulo, descripcion, id, descuentos, precio } = Game
    const { biblioteca } = useAuth()
    const [precioFinal, setPrecioFinal] = useState(precio);

    useEffect(() => {
        handlePrecio()
    }, [biblioteca]);

    const handlePrecio = () => {
        if (biblioteca.length && biblioteca.find((game) => game.videoGame.id === id)) {
            setPrecioFinal("ADQUIRIDO")
        } else if (precio === 0) {
            setPrecioFinal("GRATIS")
         } else if (descuentos && descuentos.length && !biblioteca.length) {
            setPrecioFinal(`$ ${precio} %${descuentos[0].porcentaje}`)
        }
    }

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
            <span className="btn btn-1 precio">{precioFinal}</span>
        </div>
    </>
}
