import { Link, Outlet, useNavigate } from "react-router-dom";
import { NavBarAdmin } from "../Components/NavBarAdmin";
import './AdminLayoutComponent.css'
import { useAuth } from "../../../providers/AuthProvider";
import { Roles } from "../../../utils/constants";
import { useEffect, useState } from "react";

export function AdminLayoutComponent() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { isLoading, usuario, deleteToken } = useAuth();

    useEffect(() => {
        if (!isLoading && usuario) {
            if (!usuario.role.includes(Roles.ADMIN)) {
                deleteToken();
                navigate("/login")
            } else {
                setLoading(false);
            }
        }else if (!isLoading && !usuario){
            deleteToken();
            navigate("/login")
        }
    }, [isLoading, usuario])

    return <div className="ContainerAdmin">
        {loading ? <p>Loading</p> :
            <>
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
                    <main className="admin-content">
                        <Outlet />
                    </main>
                </div>
            </>
        }
    </div>
}