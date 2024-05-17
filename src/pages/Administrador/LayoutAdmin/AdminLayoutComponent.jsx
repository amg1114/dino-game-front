import { Link, Outlet } from "react-router-dom";
import { NavBarAdmin } from "../Components/NavBarAdmin";
import './AdminLayoutComponent.css'

export function AdminLayoutComponent() {
    return <div className="ContainerAdmin">
        <NavBarAdmin />
        <div className="container content-layout">
            <aside>
                <ul className="content-Link-admin">
                    <li><Link className="Link-admin" to='/admin'>ADMINISTRAR JUEGOS</Link></li>
                    <li><Link className="Link-admin" to='/admin/users-dev'> ADMINISTRAR USUARIOS</Link></li>
                    <li><Link className="Link-admin" to='/admin/requests-dev'>SOLICITUDES DE DESARROLLADOR</Link></li>
                    <li><Link className="Link-admin" to='/admin/news'>NOTICIAS</Link></li>
                </ul>
            </aside>
            <main>
                <Outlet />
            </main>
        </div>
    </div>
}