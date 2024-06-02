import axios from "axios"
import { useEffect, useState } from "react"
import { CarouselComponent } from "../../components/CarouselComponent/CarouselComponent"
import { GameSectionList } from "../../partials/GameSectionList/GameSectionList"
import { HomeCardNoticia } from "../../components/Noticias/HomeCardNoticia"
import { HomeListaNoticia } from "../../partials/HomeListaNoticia/HomeListaNoticia"
import "./HomePage.css"
import { Link, Outlet } from "react-router-dom"
import Swal from "sweetalert2"

export function HomePage() {

    const ENDPOINT_API = process.env.REACT_APP_API + "/video-games?limit=5"
    const ENDPOINT_CATEGORIAS = process.env.REACT_APP_API + "/categorias"
    const ENDPOINT_NOTICIAS = process.env.REACT_APP_API + "/noticias?limit=3"

    const [slides, setSlides] = useState([])
    const [categorias, setCategorias] = useState([])
    const [noticias, setNoticias] = useState([])

    useEffect(() => {

        axios.get(ENDPOINT_API)
            .then(function (respuesta) {
                const game = respuesta.data
                let prevSlides = []
                game.map(juego => {
                    if (juego.assets.length > 0) {
                        const slide = juego.assets.length >= 2 ? juego.assets[1].asset : juego.assets[0].asset;
                        prevSlides.push(slide)
                    }
                })
                axios.get(ENDPOINT_CATEGORIAS)
                    .then(function (respuesta) {
                        const categorias = respuesta.data
                        axios.get(ENDPOINT_NOTICIAS)
                            .then(function (respuesta) {
                                setCategorias(categorias)
                                setNoticias(respuesta.data)
                                setSlides(prevSlides)
                            }).catch(function (error) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Algo salió mal',
                                });
                                console.log(error)
                            })


                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Algo salió mal',
                        });
                        console.log(error)
                    })

            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salió mal',
                });
                console.log(error)
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
                                        <Link to={"/categorias/" + elemento.id} key={elemento.id + "left-aside"}>
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
                            categorias.filter(categoria => categoria.videoGames.length > 0).slice(0, 3).map((elemento, index) => {
                                return (
                                    <GameSectionList
                                        games={elemento.videoGames}
                                        sectionTitle={elemento.titulo.toUpperCase()}
                                        id={elemento.id}
                                        key={'section#-' + index}
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