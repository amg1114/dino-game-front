import './gameCard.css'

export function GameCard(props) {
    return (
        < div className="fullSection" >
            <div className='gameCardSection'>
                <img className="gameImage"
                    src={props.image}
                    alt="videogame image"
                />

                <div className="urlGame">
                    <a href={props.gameUrl}>{props.gameTitle}</a>
                </div>

                <div className='description'><p>{props.descriptionGame}</p></div>
            </div>
        </div >
    )
}
