import { Link } from "react-router-dom"
import { useAuth } from "../../../providers/AuthProvider"
import './NavBarAdmin.css'
import logo from '../../../assets/dinogameLogo.png'
export function NavBarAdmin() {
    const { usuario } = useAuth()
    return <>
        <div className="navbar-container container">
            <Link to='/perfil' className="brand"><img src={logo} alt="#" className="logo" />
            </Link>
            <h1 className="titleAdmin">PAGINA DE ADMINISTADOR</h1>
            {
                usuario ?
                    <Link to='/perfil' className="btn btn-admin">
                        {usuario.nombre}  <span className="material-symbols-outlined">
                            account_circle
                        </span>
                    </Link> : <></>
            }
        </div>
    </>
}