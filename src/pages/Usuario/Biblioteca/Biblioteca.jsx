import axios from "axios";
import { useEffect, useState } from "react"
import { GameCard } from "../../../components/GameCard/GameCard";
import { useAuth } from "../../../providers/AuthProvider";

export function Biblioteca() {
    const { usuario } = useAuth();
    const ENDPOINT_BIBLIOTECA =  process.env.REACT_APP_API + "/video-games/user/"
    const [biblioteca, setBiblioteca] = useState([]);

    useEffect(() => {
        if (usuario) {
            axios.get(ENDPOINT_BIBLIOTECA + usuario.id)
                .catch(function (error) {
                    console.log(error);
                }).then(function (respuesta) {
                    setBiblioteca(respuesta.data)
                })
        }
    }, [])

    return <>{
        biblioteca === null ? <><h2>El usuario no tiene juegos descargados</h2></> : (
            <div className="game-section">
                <h2><span>DINO</span>BIBLIOTECA</h2>
                <div className="game-list">
                    {biblioteca.map((juego, index) => (
                        <GameCard key={index} Game={juego.videoGame} />
                    ))}
                </div>
            </div>
        )
    }</>
}