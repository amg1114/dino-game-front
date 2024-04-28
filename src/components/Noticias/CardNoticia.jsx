import './CardNoticia.css'

export function CardNotice({ id, imagen, titulo, descripcion, fecha, assets }) {
    return (
        <div className="CardNotice">
            <div className='noticeSectionCard'>
                <img className="noticeImage"
                    src={imagen}
                    alt="notice image"
                />
                <div className="textNotice">
                    <h3>{titulo}</h3>
                    <p>{descripcion}</p>
                </div>
            </div>
        </div>
    )
}