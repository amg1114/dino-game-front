import { Link, Outlet } from "react-router-dom";
import "./Perfil.css"
import { useAuth } from "../../../providers/AuthProvider";

export function Perfil() {
  const { deleteToken } = useAuth()

  return <>
    <div className="container">
      <div className="content-layout informacion-usuario">
        <aside>
          <h2><span>DINO</span>MENU</h2>
          <ul className="botones-perfil">
            <li>
              <Link className="btn btn-4" to="/perfil">INFORMACION PERSONAL</Link>
            </li>
            <li>
              <Link className="btn btn-4" to="/perfil/biblioteca">BIBLIOTECA</Link>
            </li>
            <li>
              <Link className="btn btn-4" to="/perfil/solicitud-desarrollador">SOLICITUD PERFIL DESARROLLADOR</Link>
            </li>
            <li>
              <Link to="/" className="btn btn-3" onClick={deleteToken}>CERRAR SESION</Link>
            </li>
          </ul>
        </aside>

        <main>
          <Outlet />
        </main>

      </div>
    </div>
  </>
}