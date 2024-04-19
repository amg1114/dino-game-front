import logo from "./assets/Dinogamelogo.png"
import "./Navbar.css";

export default function Navbar() {
    return (
        <div className="navbar">

            <img src={ logo } alt="#" className="logo" />

            <h1 className="titulo">
                <span className="titulo_dino">DINO</span>
                <span className="titulo_game">GAME</span>
            </h1>

            <div className="enlaces">
                <a href="" className="registrarse">REGISTRARSE</a>
                <a href="" className="iniciar-sesion">INICIAR SESIÓN</a>
                <button id="searchButton" type="button" className="botonBuscar">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                </svg>

                </button>
            </div>

        </div>

    )
}