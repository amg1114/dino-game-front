import { GameCard } from "../../components/GameCard/GameCard";
import "./GameSectionList.css"

export function GameSectionList({games, sectionTitle}){
    return(
        <div className="game-section">
            <h2>{sectionTitle}</h2>
            <div className="game-list">
                {games.map((game, index) => (< GameCard
                key = {index}
                image={game.assets[0].url}
                gameTitle={game.titulo}
                gameUrl={"/juegos/" + game.id}
                descriptionGame={game.descripcion.slice(0,100)}/>))
                }
            </div>
        </div>
    )
}