import { Link, Outlet, useNavigate } from "react-router-dom";
import { NavBarDeveloper } from "../NavBarDeveloper/NavbarDeveloper";
import { useAuth } from "../../../providers/AuthProvider";
import { LoadingSpinner } from "../../../components/LoadingSpinner/LoadingSpinner";
import { Roles } from "../../../utils/constants";
import { useEffect } from "react";

export function LayoutDeveloper() {
    const navigate = useNavigate();
    const { isLoading, usuario, deleteToken } = useAuth();

    useEffect(() => {
        if (!isLoading && usuario) {
            if (!usuario.role.includes(Roles.DEVELOPER)) {
                deleteToken();
                navigate("/login")
            }
        } else if (!isLoading && !usuario) {
            deleteToken();
            navigate("/login")
        }
    }, [isLoading, usuario])

    return <div className="Container-admin-dev">
        {isLoading ? <LoadingSpinner /> : <>
            <NavBarDeveloper />
            <div className="container content-layout">
                <aside className="aside-admin-dev">
                    <h2><span>DINO</span>MENU</h2>
                    <ul className="content-Link-admin-dev">
                        <li><Link className="btn btn-4" to='/dashboard'>ADMINISTRAR JUEGOS</Link></li>
                        <li><Link className="btn btn-4" to='/dashboard/crear'>CREAR JUEGO</Link></li>
                        <li><Link className="btn btn-4" to='/dashboard/finanzas'>FINANZAS</Link></li>
                        <li><Link className="btn btn-4" to='/dashboard/noticias'>NOTICIAS</Link></li>
                        <li><Link to="/" className="btn btn-3 Link-admin-dev-cs" onClick={deleteToken}>CERRAR SESION</Link></li>
                    </ul>
                </aside>
                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </>}
    </div>
}