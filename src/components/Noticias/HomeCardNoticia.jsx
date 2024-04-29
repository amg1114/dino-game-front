import { Link } from 'react-router-dom'
import './HomeCardNoticia.css'

export function HomeCardNoticia({ id, imagen, titulo, descripcion, fecha, assets }) {

    return (
        <div className='home-notice-section'>
            <img className="noticeImage"
                src={imagen}
                alt="notice image"
            />
            <div className="textNotice">
                <Link to={`/noticias/${id}`} className="noticeTit"> {titulo}</Link>
            </div>
        </div>
    )
}