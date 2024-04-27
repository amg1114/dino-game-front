import axios from "axios"
import { useEffect, useState } from "react"
import { CarouselComponent } from "../../components/CarouselComponent/CarouselComponent"
import { GameSectionList } from "../../partials/GameSectionList/GameSectionList"
import { HomeCardNoticia } from "../../components/Noticias/HomeCardNoticia"

export function HomePage() {

    const ENDPOINT_API = "https://dino-game-backend-production.up.railway.app/api/video-games?limit=5"
    const ENDPOINT_CATEGORIAS = "https://dino-game-backend-production.up.railway.app/api/categorias"
    const ENDPOINT_NOTICIAS = "https://dino-game-backend-production.up.railway.app/api/noticias?limit=3"

    const [slides, setSlides] = useState([])
    const [categorias, setCategorias] = useState([])
    const [noticias, setNoticias] = useState([])

    useEffect(() => {

        axios.get(ENDPOINT_API)
            .catch(function (error) {
                console.log(error)
            })
            .then(function (respuesta) {
                const game = respuesta.data
                let prevSlides = []
                game.map(juego => {
                    prevSlides.push(juego.assets[0])
                })
                setSlides(prevSlides)
            })

        axios.get(ENDPOINT_CATEGORIAS)
            .catch(function (error) {
                console.log(error)
            })
            .then(function (respuesta) {
                const category = respuesta.data
                setCategorias(category)
            })

        axios.get(ENDPOINT_NOTICIAS)
            .catch(function (error) {
                console.log(error)
            })
            .then(function (respuesta) {
                setNoticias(respuesta.data)
            })
            console.log(noticias)
    }, [])

    return <>
        {slides === null ? <></> : (
            categorias === null ? <></> : (
                noticias === null ? <></> : (

                <div className="container content-layout ">
                    <div className="left-aside">
                        <ul>
                            {
                                categorias.map((elemento, index) => {
                                    return <li><a href={"/categorias" + elemento.id} >{elemento.titulo}</a></li>
                                })
                            }
                        </ul>
                    </div>

                    <div className="main">
                        <h1 className="recomendados"><span>Dino</span>Destacados y recomendados</h1>
                        <CarouselComponent slides={slides} />
                    </div>

                    <div className="right-aside">     
                        <ul>
                            {
                                noticias.map((elemento, index) => {
                                    return(
                                    <li>
                                        <HomeCardNoticia 
                                        image={elemento.assets[0].url}
                                        title={elemento.title}
                                        description={elemento.descripcion}
                                        url={"/noticias/" + elemento.id}
                                        />
                                    </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                </div>
                )
            )
        )
        }
    </>
}