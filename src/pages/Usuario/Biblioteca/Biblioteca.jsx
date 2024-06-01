import axios from "axios";
import { useEffect, useState } from "react"
import { GameCard } from "../../../components/GameCard/GameCard";
import { useAuth } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

export function Biblioteca() {
    const { usuario } = useAuth();
    const ENDPOINT_BIBLIOTECA = process.env.REACT_APP_API + "/video-games/biblioteca"
    const [biblioteca, setBiblioteca] = useState([]);

    useEffect(() => {
        if (usuario) {
            axios.get(ENDPOINT_BIBLIOTECA)
                .then(function (respuesta) {
                    setBiblioteca(respuesta.data)
                }).catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Algo salió mal',
                    });
                })
        }
    }, [usuario])

    return <>{
        biblioteca === null ? <><h2>El usuario no tiene juegos descargados</h2></> : (
            <div className="game-section">
                <h2><span>DINO</span>BIBLIOTECA</h2>
                {!biblioteca.length ? <p>No tienes juegos en tu biblioteca.</p> :
                    <div className="game-list">
                        {biblioteca.map((juego, index) => (
                            <GameCard key={index} Game={juego.videoGame} />
                        ))}
                    </div>
                }
            </div>
        )
    }</>
}