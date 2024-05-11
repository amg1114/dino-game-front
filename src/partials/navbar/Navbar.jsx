import { Link } from "react-router-dom";
import logo from "../../assets/dinogame-logo.png"
import "./Navbar.css";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";

export default function Navbar() {

    const [menu, setMenu] = useState(null);
    const { usuario } = useAuth()
    const open = Boolean(menu)

    const mostrarMenu = (e) => {
        setMenu(e.currentTarget);
    };

    const ocultarMenu = () => {
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
                    {usuario ?
                        <Link to='/perfil' className="enlace btn btn-1">
                            {usuario.nombre}  <span className="material-symbols-outlined">
                                account_circle
                            </span> 
                        </Link>
                        :
                        <>
                            <span id="logIn" className="material-symbols-outlined" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={mostrarMenu} >
                                person
                            </span>
                            <Menu id="basic-menu" anchorEl={menu} open={open} onClose={ocultarMenu} MenuListProps={{ 'aria-labelledby': 'logIn', }} >
                                <MenuItem className="menuItem" onClick={ocultarMenu} component={Link} to='/login' >Iniciar Sesión</MenuItem>
                                <MenuItem className="menuItem" onClick={ocultarMenu} component={Link} to='/register'>Registrarse</MenuItem>
                            </Menu>
                        </>
                    }
                </div>
            </div>
        </header>
    )
}