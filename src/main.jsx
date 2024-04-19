import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GameCard } from "./gameCard"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameCard
      image="https://image.api.playstation.com/cdn/UP0006/CUSA01925_00/RxeNb9Ph1y2VhBGv5Ct0tuY6f5xC4t9f.png"
      gameTitle="NEED FOR SPEED: DELUXE EDITION"
      gameUrl="#"
      descriptionGame="juego #1"
    />

    <GameCard
    image="https://www.irrompibles.net/irrwp/wp-content/uploads/2019/11/NeedForSpeedHeat-head.jpg"
    gameTitle="NEED FOR SPEED: HEAT"
    gameUrl="#"
    descriptionGame="juego #2"
    />

<GameCard
    image="https://cdn.akamai.steamstatic.com/steam/apps/1262560/header.jpg?t=1605151411"
    gameTitle="NEED FOR SPEED: MOST WANTED"
    gameUrl="#"
    descriptionGame="juego #3"
    />

  </React.StrictMode>,
)
