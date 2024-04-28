import axios from "axios"
import { useEffect, useState } from "react"
import { CarouselComponent } from "../../components/CarouselComponent/CarouselComponent"
import { GameSectionList } from "../../partials/GameSectionList/GameSectionList"
import { HomeCardNoticia } from "../../components/Noticias/HomeCardNoticia"
import { HomeListaNoticia } from "../../partials/HomeListaNoticia/HomeListaNoticia"
import "./HomePage.css"
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
                            axios.get("https://dinogame.up.railway.app/api/categorias/" + categoria.id)
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
                                    categorias.slice(0,6).map((elemento, index) => {
                                        return <div className="categoria" key={elemento.id + "left-aside"}><a href={"/categorias" + elemento.id} >{elemento.titulo}</a></div>
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


            </div>
        )
        }
    </>
}