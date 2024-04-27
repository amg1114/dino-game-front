import axios from "axios"
import { useEffect, useState } from "react"
import { CarouselComponent } from "../../components/CarouselComponent/CarouselComponent"

export function HomePage() {

    const ENDPOINT_API = "https://dino-game-backend-production.up.railway.app/api/video-games?limit=5"
    const ENDPOINT_CATEGORIAS = "https://dino-game-backend-production.up.railway.app/api/categorias"

    const [slides, setSlides] = useState([])
    const [categorias, setCategorias] = useState([])

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
    }, [])

    useEffect(() => {
        axios.get(ENDPOINT_CATEGORIAS)
            .catch(function (error) {
                console.log(error)
            })
            .then(function (respuesta) {
                setCategorias(respuesta.data)
                console.log(categorias)
            })
            
    }, [])


    return <>

        {slides === null ? <></> : (
            <div className="container content-layout ">

                <div className="left-aside">
                    <ul>
                        {
                            categorias === null ? <></> : (
                                categorias.map((elemento, index) => {
                                    return <li><a href={"/categorias" + elemento.id} >{elemento.titulo}</a></li>
                                })
                            )
                        }
                    </ul>
                </div>

                <div className="main">
                    <h1 className="recomendados"><span>Dino</span>Destacados y recomendados</h1>
                    <CarouselComponent slides={slides} />
                </div>

                <div className="right-aside">
                    <p>hola</p>
                </div>

            </div>
        )
        }
    </>
}