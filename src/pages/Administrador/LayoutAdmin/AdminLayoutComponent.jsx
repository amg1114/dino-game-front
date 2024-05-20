import { Link, Outlet } from "react-router-dom";
import { NavBarAdmin } from "../Components/NavBarAdmin";
import './AdminLayoutComponent.css'
import { useAuth } from "../../../providers/AuthProvider";

export function AdminLayoutComponent() {
    const { deleteToken } = useAuth()
    return <div className="ContainerAdmin">
        <NavBarAdmin />
        <div className="container content-layout">
            <aside className="aside-admin">
                <h2><span>DINO</span>MENU</h2>
                <ul className="content-Link-admin">
                    <li><Link className="btn btn-4 Link-admin" to='/admin'>ADMINISTRAR JUEGOS</Link></li>
                    <li><Link className="btn btn-4 Link-admin" to='/admin/desarrolladores'> ADMINISTRAR USUARIOS</Link></li>
                    <li><Link className="btn btn-4 Link-admin" to='/admin/solicitudes'>SOLICITUDES DE DESARROLLADOR</Link></li>
                    <li><Link className="btn btn-4 Link-admin" to='/admin/noticias'>NOTICIAS</Link></li>
                    <li><Link to="/" className="btn btn-3 Link-admin Link-admin-cs" onClick={deleteToken}>CERRAR SESION</Link></li>
                </ul>
            </aside>
            <main>
                <Outlet />
            </main>
        </div>
    </div>
}