import './GameCard.css'

export function GameCard({ image, title, description, url}) {
    return (
        <div className='gameCardSection'>
            <img className="gameImage"
                src={image}
                alt="videogame image"
            />

            <div className="urlGame">
                <a href={url}>{title}</a>
            </div>

            <div className='description'><p>{description}</p></div>
        </div>
    )
}
