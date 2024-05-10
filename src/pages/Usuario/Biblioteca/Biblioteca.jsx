import axios from "axios";
import { useEffect, useState } from "react"
import { GameCard } from "../../../components/GameCard/GameCard";

export function Biblioteca(){

    const ENDPOINT_BBLIOTECA = "https://dinogame.up.railway.app/api/video-games/user"
    const [biblioteca, setBiblioteca]=useState([]);

    useEffect(()=>{
        axios.get(ENDPOINT_BBLIOTECA)
        .catch(function(error){
            console.log(error);
        }).then(function(respuesta){
            setBiblioteca(respuesta.data.videoGame)
        })
    },[])

    return <>{
        biblioteca === null ? <><h2>El usuario no tiene juegos descargados</h2></> : (
            <div className="lista-juegos">
                <h2><span>DINO</span>BIBLIOTECA</h2>
                {biblioteca.map((juego, index) => (
                    <GameCard key={index} Game={juego} />
                ))}
            </div>
        )
    }</>
}