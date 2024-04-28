import './CardNoticia.css'

export function CardNotice({ id, imagen, titulo, descripcion, fecha, assets }) {

    const noticiaLink = ({ id }) => {
        <Link to={`/noticias/${id}`}> </Link>
    }

    return (
            <div className="CardNotice">
                <div className='noticeSectionCard'>
                    <img className="noticeImage"
                        src={imagen}
                        alt="notice image"
                    />
                    <div className="textNotice">
                        <div className="noticeTitCard"> {titulo} </div>
                        <div className='descrip'><p>{descripcion}</p></div>
                    </div>
                </div>
            </div>
    )
}