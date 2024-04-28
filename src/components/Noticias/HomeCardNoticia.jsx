import { Link } from 'react-router-dom'
import './HomeCardNoticia.css'

export function HomeCardNoticia({ id, imagen, titulo, descripcion, fecha, assets }) {

    const noticiaLink = ({ id }) => {
        <Link to={`/noticias/${id}`}> </Link>
    }

    return (
        <div className='noticeSection'>
            <img className="noticeImage"
                src={imagen}
                alt="notice image"
            />
            <div className="textNotice">
                <div className="noticeTit"><p> {titulo}</p></div>
                <div className="descriptionNews"><p>{descripcion}</p></div>
                <p><noticiaLink id={id} /></p>
            </div>
        </div>
    )
}