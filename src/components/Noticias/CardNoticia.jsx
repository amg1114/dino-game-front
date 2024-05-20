import { Link } from 'react-router-dom'
import './CardNoticia.css'

export function CardNotice({ id, imagen, titulo, descripcion, fecha, assets }) {
    return (
        <div className="CardNotice">
            <Link to={ "/noticias/" + id}>
                <div className='noticeSectionCard'>
                    {imagen ?
                        <img className="noticeImage"
                            src={imagen}
                            alt="notice image"
                        /> : <></>}
                    <div className="textNotice">
                        <h3>{titulo}</h3>
                        <div dangerouslySetInnerHTML={{__html:descripcion}}></div>
                    </div>
                </div>
            </Link>
        </div >
    )
}