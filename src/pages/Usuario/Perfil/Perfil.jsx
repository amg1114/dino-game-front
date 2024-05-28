import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Perfil.css"
import { useAuth } from "../../../providers/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";

export function Perfil() {
  const { deleteToken, usuario } = useAuth()
  const [roles, setRoles] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (usuario != null) {
      axios.get(process.env.REACT_APP_API + `/users/${usuario.id}/role`)
        .then((respuesta) => {
          setRoles(respuesta.data)
        })
        .catch((error) => console.log(error))
    }
  }, [usuario])

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
            {
              roles.map((rol) => {
                if (rol === "ADMINISTRATOR") {
                  return <button className="btn btn-admin" onClick={() => { navigate('/admin') }}>DASHBOARD ADMIN</button>
                }
                if (rol === "DEVELOPER") {
                  return <button className="btn btn-admin" onClick={() => { navigate('/dashboard') }}>DASHBOARD DEV</button>
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
  </>
}