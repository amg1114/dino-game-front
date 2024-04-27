import './CardNoticia.css'

export function CardNotice({ NoticePage, image, url, title, description }) {
    return (
        <div>
            <h1>{NoticePage}</h1>
            <div className="CardNotice">
                <div className='noticeSectionCard'>
                    <img className="noticeImage"
                        src={image}
                        alt="notice image"
                    />
                    <div className="textNotice">
                        <div className="noticeTit">
                            <a className="urlNotice" href={url}>{title}</a>
                        </div>
                        <div className='desc'><p>{description}</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}