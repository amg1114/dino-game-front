import { Link, Outlet } from "react-router-dom";
import { NavBarAdmin } from "../Components/NavBarAdmin";
import { useAuth } from "../../../providers/AuthProvider";

export function AdminLayoutComponent() {
    const { deleteToken } = useAuth()
    return <div className="Container-admin-dev">
        <NavBarAdmin />
        <div className="container content-layout">
            <aside className="aside-admin-dev">
                <h2><span>DINO</span>MENU</h2>
                <ul className="content-Link-admin-dev">
                    <li><Link className="btn btn-4" to='/admin'>ADMINISTRAR JUEGOS</Link></li>
                    <li><Link className="btn btn-4" to='/admin/desarrolladores'> ADMINISTRAR USUARIOS</Link></li>
                    <li><Link className="btn btn-4" to='/admin/solicitudes'>SOLICITUDES DE DESARROLLADOR</Link></li>
                    <li><Link className="btn btn-4" to='/admin/noticias'>NOTICIAS</Link></li>
                    <li><Link to="/" className="btn btn-3 Link-admin-dev-cs" onClick={deleteToken}>CERRAR SESION</Link></li>
                </ul>
            </aside>
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    </div>
}