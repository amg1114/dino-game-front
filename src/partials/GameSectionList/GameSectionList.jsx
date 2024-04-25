import { GameCard } from "../../components/GameCard/GameCard";
import "./GameSectionList.css"

export function GameSectionList({games, sectionTitle}){
    return(
        <div className="game-section">
            <h2>{sectionTitle}</h2>
            <div className="game-list">
                {games.map((game, index) => (< GameCard
                key = {index}
                image={game.image}
                gameTitle={game.gameTitle}
                gameUrl={game.gameUrl}
                descriptionGame={game.descriptionGame}/>))
                }
            </div>
        </div>
    )
}