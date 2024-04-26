import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import { LayoutComponent } from './pages/LayoutComponent'
import { StyleGuidePage } from './pages/StyleGuide/StyleGuide'
import { HomePage } from './pages/HomePage/HomePage'
import { PaginaNoticias } from './pages/Noticias/PaginaNoticias/PaginaNoticias'
import { VistaNoticia } from './pages/Noticias/VistaNoticia/VistaNoticia'
import { PaginaJuegos } from './pages/Juegos/PaginaJuegos/PaginaJuegos'
import { VistaJuego } from './pages/Juegos/VistaJuego/VistaJuego'
import { PaginaCategorias } from './pages/Categorias/PaginaCatgeorias/PaginaCatgeorias'
import { VistaCategoria } from './pages/Categorias/VistaCategoria/VistaCategoria'

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <LayoutComponent />,
      children: [
        {
          path: '',
          element: <HomePage />
        },
        {
          path: 'juegos',
          element: <PaginaJuegos />,
          children: [
            {
              path: ':id',
              element: <VistaJuego />
            }
          ]
        },
        {
          path: 'categorias',
          element: <PaginaCategorias />,
          children: [
            {
              path: ':id',
              element: <VistaCategoria />
            }
          ]
        },
        {
          path: 'noticias',
          element: <PaginaNoticias />,
          children: [
            {
              path: ':id',
              element: <VistaNoticia />
            }
          ]
        },
        {
          path: 'style-guide',
          element: <StyleGuidePage />
        },
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
