import { Link } from "react-router-dom";
import logo from "../../assets/dinogame-logo.png"
import "./Navbar.css";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export default function Navbar() {

    const [menu, setMenu] = useState(null);
    
    const open = Boolean(menu)
    
    const mostrarMenu = (e) => {
        setMenu(e.currentTarget);
    };

    const ocultarMenu = () =>{
        setMenu(null);
    };


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
                    <Link to="/categorias" className="enlace">
                        CATEGORIAS</Link> 
                    <Link to='/juegos' className="enlace">
                        JUEGOS</Link>
                    <Link to='/noticias' className="enlace">
                        NOTICIAS</Link>
                    {/*<Link to='/profile' className="enlace">*/}
                        <span id="logIn" className="material-symbols-outlined" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={mostrarMenu} >
                            person
                        </span> {/*</Link>*/}
                        <Menu id="basic-menu" anchorEl={menu} open={open} onClose={ocultarMenu} MenuListProps={{'aria-labelledby' : 'logIn', }} >
                            <MenuItem className="menuItem" onClick={ocultarMenu} component={Link} to='/login' >Iniciar Sesión</MenuItem>
                            <MenuItem className="menuItem" onClick={ocultarMenu} component={Link} to='/register'>Registrarse</MenuItem>
                        </Menu>
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