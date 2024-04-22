import logo from "../../assets/dinogame-logo.png"
import "./Navbar.css";

export default function Navbar() {
    return (
        <div className="navbar">

            <img src={logo} alt="#" className="logo" />

            <h1 className="titulo">
                <span>DINO</span>GAME
            </h1>

            <div className="enlaces">
                <a href="" className="registrarse">REGISTRARSE</a>
                <a href="" className="iniciar-sesion">INICIAR SESIÓN</a>
            </div>

        </div>

    )
}