import './HomeCardNoticia.css'

export function HomeCardNoticia({ image, title, description, url}) {
    return (
        <div className='noticeSection'>
            <img className="noticeImage"
                src={image}
                alt="notice image"
            />
            <div className="textNotice">

                <div className="noticeTit">
                   <a className="url" href={url}>{title}</a> 
                </div>
                <div className="descriptionNews"><p>{description}</p></div>

            </div>
        </div>
    )
}