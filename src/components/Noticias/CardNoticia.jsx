import { Link } from 'react-router-dom'
import './CardNoticia.css'

export function CardNotice({ id, imagen, titulo, descripcion, fecha, assets }) {
    return (
        <div className="CardNotice">
            <Link to={window.location.href +"/"+ id}>
                <div className='noticeSectionCard'>
                    <img className="noticeImage"
                        src={imagen}
                        alt="notice image"
                    />
                    <div className="textNotice">
                        <span><h3>{titulo} </h3>
                            <p>{descripcion}</p></span>
                    </div>
                </div>
            </Link>
        </div >
    )
}