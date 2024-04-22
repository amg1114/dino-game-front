import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GameCard } from "./components/GameCard/GameCard.jsx"

import { Carousel } from './components/Carousel/CarouselFuncion.jsx'

const slidesData = [
  {
    url: 'https://media.vandal.net/m/5-2022/20225216311894_1.jpg',
    titulo: 'imagen1'
  },
  {
    url: 'https://media.vandal.net/m/1-2022/202211215412443_1.jpg',
    titulo: 'imagen2'
  },
  {
    url: 'https://as02.epimg.net/meristation/imagenes/2021/03/20/videos/1616230737_035086_1616231066_noticia_normal.jpg',
    titulo: 'imagen3'
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    < Carousel
      slides={slidesData}
    />

  </React.StrictMode>,
)
