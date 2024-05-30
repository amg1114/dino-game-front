import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Perfil.css"
import { useAuth } from "../../../providers/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";

export function Perfil() {
  const { isLoading, usuario, deleteToken } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !usuario) {
      navigate("/login")
    }
  }, [usuario, isLoading])

  return <>{isLoading ? <p>Loading</p> : <>
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
            {
              usuario.role.map((rol) => {
                if (rol === "ADMINISTRATOR") {
                  return <li key={'btn-admin'}>
                    <Link className="btn btn-4" to='/admin'>ADMINISTRACIÓN</Link>
                  </li>
                }
                if (rol === "DEVELOPER") {
                  return <li key={'btn-dashboard'}><Link className="btn btn-4" to='/dashboard'>DASHBOARD</Link></li>
                }
              })
            }
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
  </>}</>
}