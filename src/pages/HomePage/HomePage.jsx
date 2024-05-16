import axios from "axios"
import { useEffect, useState } from "react"
import { CarouselComponent } from "../../components/CarouselComponent/CarouselComponent"
import { GameSectionList } from "../../partials/GameSectionList/GameSectionList"
import { HomeCardNoticia } from "../../components/Noticias/HomeCardNoticia"
import { HomeListaNoticia } from "../../partials/HomeListaNoticia/HomeListaNoticia"
import "./HomePage.css"
import { Link, Outlet } from "react-router-dom"
export function HomePage() {

    const ENDPOINT_API = process.env.REACT_APP_API + "/video-games?limit=5"
    const ENDPOINT_CATEGORIAS = process.env.REACT_APP_API + "/categorias"
    const ENDPOINT_NOTICIAS = process.env.REACT_APP_API + "/noticias?limit=3"

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
                    if (juego.assets.length > 0) {
                        const slide = juego.assets.length < 1 ? juego.assets[0] : juego.assets[1];
                        prevSlides.push(slide)
                    }
                })
                axios.get(ENDPOINT_CATEGORIAS)
                    .catch(function (error) {
                        console.log(error)
                    })
                    .then(function (respuesta) {
                        const categorias = respuesta.data
                        axios.get(ENDPOINT_NOTICIAS)
                            .catch(function (error) {
                                console.log(error)
                            })
                            .then(function (respuesta) {
                                setCategorias(categorias)
                                setNoticias(respuesta.data)
                                setSlides(prevSlides)
                            })

                    })
            })
    }, [])

    return <>
        {slides === null ? <></> : (
            <div className="container">
                <div className="main">
                    <section className="banner">
                        <CarouselComponent slides={slides} />
                        <HomeListaNoticia notices={noticias} sectionTitle={<><span>DINO</span>NOTICIAS</>} />
                    </section>


                    <section className="seccion-categorias">
                        <h2><span>DINO</span>CATEGORIAS</h2>
                        <div className="lista-categorias">
                            {
                                categorias.slice(0, 6).map((elemento, index) => {
                                    return (
                                        <Link href={"/categorias/" + elemento.id} key={elemento.id + "left-aside"}>
                                            <div className="categoria" >
                                                {elemento.titulo}
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </section>

                    <>
                        {
                            categorias.slice(0, 3).map((elemento, index) => {
                                return (
                                    <GameSectionList
                                        games={elemento.videoGames}
                                        sectionTitle={elemento.titulo.toUpperCase()}
                                        id={elemento.id}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </>
                </div>
                <Outlet />
            </div>
        )
        }
    </>
}