import { GameCard } from "../../components/GameCard/GameCard";
import "./GameSectionList.css"

export function GameSectionList({ games, sectionTitle, id}) {

    const showLink = games.length > 3 ? true : false;

    return (
        <div className="game-section">
            <div className="game-section-title">
                <h2><span>DINO</span>{sectionTitle}</h2>
                {
                    showLink ? <a href={(`/categorias/${id}`)} className="btn btn-1 btn-ver-mas">Ver mas</a> : <></>
                }
            </div>
            <div className="game-list">
                {
                    games.slice(0, 3).map((game, index) => (
                        <GameCard
                            key={'game#-'+index}
                            Game={game} />))
                }
            </div>
        </div>
    )
}