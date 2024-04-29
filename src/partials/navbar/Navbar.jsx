import { Link } from "react-router-dom";
import logo from "../../assets/dinogame-logo.png"
import "./Navbar.css";

export default function Navbar() {
    return (
        <header>
            <div className="navbar container">
                <Link to='/'><img src={logo} alt="#" className="logo" /></Link>
                <Link to='/' className="titulo">
                    <h1 >
                        <span>DINO</span>GAME
                    </h1>
                </Link>
                <div className="enlaces">
                    <Link to='/juegos' className="enlace">
                        JUEGOS</Link>
                    <Link to='/noticias' className="enlace">
                        NOTICIAS</Link>
                    <Link to='/profile' className="enlace">
                        <span className="material-symbols-outlined">
                            person
                        </span></Link>
                    <button id="searchButton">
                        <span className="material-symbols-outlined">
                            search
                        </span>
                    </button>
                </div>
            </div>
        </header>

    )
}