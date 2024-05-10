import image from "../assets/image.png"
import './ErrorElement.css'
import { Link } from "react-router-dom"

export function ErrorElement() { 
    return (
        <div className="conte">

            <img src={image} className="imagen" /> 
            <div className="textoError">
                <h2 className="texto404">ERROR 404</h2>
                <span>
                    <h2 className="textoInfo"><span>RAW</span>YOS</h2>
                    <h2 className="textoInfo">LA PÁGINA A LA QUE INTENTASTE ACCEDER NO FUE ENCONTRADA</h2>
                    <Link to="/" className="url">www.DinoGame.com</Link> 
                </span>
            </div>

        </div>
    )
}


