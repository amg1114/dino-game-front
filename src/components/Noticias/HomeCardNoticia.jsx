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
                   <a className="url" href={url}>{title.slice(0,100)}...</a> 
                </div>
            </div>
        </div>
    )
}