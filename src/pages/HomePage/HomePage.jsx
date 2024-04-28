import axios from "axios"
import { useEffect, useState } from "react"
import { CarouselComponent } from "../../components/CarouselComponent/CarouselComponent"
import { GameSectionList } from "../../partials/GameSectionList/GameSectionList"
import { HomeCardNoticia } from "../../components/Noticias/HomeCardNoticia"

export function HomePage() {

    const ENDPOINT_API = "https://dinogame.up.railway.app/api/video-games?limit=5"
    const ENDPOINT_CATEGORIAS = "https://dinogame.up.railway.app/api/categorias"
    const ENDPOINT_NOTICIAS = "https://dinogame.up.railway.app/api/noticias?limit=3"

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
                axios.get(ENDPOINT_CATEGORIAS)
                    .catch(function (error) {
                        console.log(error)
                    })
                    .then(function (respuesta) {
                        const category = respuesta.data
                        let prevCategoria = []
                        category.map((categoria) => {
                            axios.get("https://dino-game-backend-production.up.railway.app/api/categorias/" + categoria.id)
                                .catch(function (error) {
                                    console.log(error)
                                })
                                .then(function (respuesta) {
                                    prevCategoria.push(respuesta.data)
                                    axios.get(ENDPOINT_NOTICIAS)
                                        .catch(function (error) {
                                            console.log(error)
                                        })
                                        .then(function (respuesta) {
                                            setCategorias([...prevCategoria, respuesta.data])
                                            setNoticias(respuesta.data)
                                            setSlides(prevSlides)
                                        })
                                })
                        })
                    })
            })


    }, [])

    return <>
        {slides === null ? <></> : (
            <div className="container content-layout ">
                <div className="left-aside">
                    <h2>CATEGORIAS</h2>
                    <ul>
                        {
                            categorias.map((elemento, index) => {
                                return <li key={elemento.id + "left-aside"}><a href={"/categorias" + elemento.id} >{elemento.titulo}</a></li>
                            })
                        }
                    </ul>
                </div>

                <div className="main">
                    <h2 className="recomendados"><span>DINO</span>DESTACADOS Y RECOMENDADOS</h2>
                    <CarouselComponent slides={slides} />
                    <>
                        {
                            categorias.slice(0, 3).map((elemento, index) => {
                                return (
                                    <GameSectionList
                                        games={elemento.videoGames}
                                        sectionTitle={elemento.titulo}
                                        id={elemento.id}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </>
                </div>

                <div className="right-aside">
                    <h2>NOTICIAS</h2>
                    {
                        noticias.map((elemento, index) => {
                            return (
                                <HomeCardNoticia
                                    image={elemento.assets[0].url}
                                    title={elemento.titulo}
                                    description={elemento.descripcion.slice(0,70)}
                                    url={"/noticias/" + elemento.id}
                                    key={index}
                                />
                            )
                        })
                    }
                </div>

            </div>
        )
        }
    </>
}