import { Link, Outlet } from "react-router-dom";
import { NavBarDeveloper } from "../NavBarDeveloper/NavbarDeveloper";
import { useAuth } from "../../../providers/AuthProvider";

export function LayoutDeveloper() {
    const {deleteToken} = useAuth()
    return <div className="Container-admin-dev">
        <NavBarDeveloper />
        <div className="container content-layout">
            <aside className="aside-admin-dev">
                <h2><span>DINO</span>MENU</h2>
                <ul className="content-Link-admin-dev">
                    <li><Link className="btn btn-4" to='/developer'>ADMINISTRAR JUEGOS</Link></li>
                    <li><Link className="btn btn-4" to='/developer/crear'>CREAR JUEGO</Link></li>
                    <li><Link className="btn btn-4" to='/developer/finanzas'>FINANZAS</Link></li>
                    <li><Link className="btn btn-4" to='/developer/noticias'>NOTICIAS</Link></li>
                    <li><Link to="/" className="btn btn-3 Link-admin-dev-cs" onClick={deleteToken}>CERRAR SESION</Link></li>
                </ul>
            </aside>
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    </div>
}