import { Link } from 'react-router-dom'
import './HomeCardNoticia.css'

export function HomeCardNoticia({ id, imagen, titulo, descripcion, fecha, assets }) {

    return (
        <div >
            <Link to={`/noticias/${id}`} className='home-notice-section'>
                <img className="noticeImage"
                    src={imagen}
                    alt="notice image"
                />
                <div className={/^\/admin\/news\/[^/]+$/.test(window.location.pathname) ? "textNoticeBlack" : "textNotice"}>
                    {titulo}
                </div>
            </Link>
        </div>
    )
}