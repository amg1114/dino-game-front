import { GameCard } from "../../components/GameCard/GameCard";

export function GameSectionList({games}){
    return(
        <div className="fullSection">
            {games.map((game) => (< GameCard  
            image={game.image} 
            gameTitle={game.gameTitle} 
            gameUrl={game.gameUrl}
            descriptionGame={game.descriptionGame}/>))
            }
        </div>
    )
}