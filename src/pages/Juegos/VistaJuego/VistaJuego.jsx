import { Link } from "react-router-dom";

export function VistaJuego() {
    return (<>
        <div className="modal-fade animate__animated animate__fadeIn">
            <div className="modal-content animate__animated animate__slideInDown">
                <div className="modal-header">
                    <Link to="/juegos" className="modal-closer">
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </Link>
                </div>
                <h1>Titulo del Juego</h1>
            </div>
        </div>
    </>)
}