import axios from "axios";
import { useEffect, useState } from "react"
import { GameCard } from "../../../components/GameCard/GameCard";
import { useAuth } from "../../../providers/AuthProvider";

export function Biblioteca() {
    const { usuario } = useAuth();
    const ENDPOINT_BBLIOTECA = "https://dinogame.up.railway.app/api/video-games/user/"
    const [biblioteca, setBiblioteca] = useState([]);

    useEffect(() => {
        if (usuario) {
            axios.get(ENDPOINT_BBLIOTECA + usuario.id)
                .catch(function (error) {
                    console.log(error);
                }).then(function (respuesta) {
                    setBiblioteca(respuesta.data)
                })
        }
    }, [])

    return <>{
        biblioteca === null ? <><h2>El usuario no tiene juegos descargados</h2></> : (
            <div className="lista-juegos">
                <h2><span>DINO</span>BIBLIOTECA</h2>
                {biblioteca.map((juego, index) => (
                    <GameCard key={index} Game={juego.videoGame} />
                ))}
            </div>
        )
    }</>
}