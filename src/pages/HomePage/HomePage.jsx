import axios from "axios"
import { useEffect, useState } from "react"
import { CarouselComponent } from "../../components/CarouselComponent/CarouselComponent"

export function HomePage() {

    const ENDPOINT_API = "https://dino-game-backend-production.up.railway.app/api/video-games"

    const [slides, setSlides] = useState([])

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


    return <>

        {slides === null ? <></> : (
            < div className="container content-layout" >
                <div className="home-container-layout">

                    <div className="left-aside">

                    </div>

                    <div className="main">
                        <CarouselComponent slides={slides} />
                    </div>

                    <div className="right-aside">

                    </div>

                </div>
            </div >
        )
        }
    </>
}