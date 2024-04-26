import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Componentes
import { LayoutComponent } from './pages/LayoutComponent'

// Paginas
import { HomePage } from './pages/HomePage/HomePage'
import { PaginaNoticias } from './pages/Noticias/PaginaNoticias/PaginaNoticias'
import { PaginaCategorias } from './pages/Categorias/PaginaCategorias/PaginaCategorias'
import { PaginaJuegos } from './pages/Juegos/PaginaJuegos/PaginaJuegos'
import { StyleGuidePage } from './pages/StyleGuide/StyleGuide'

// Vistas
import { VistaNoticia } from './pages/Noticias/VistaNoticia/VistaNoticia'
import { VistaJuego } from './pages/Juegos/VistaJuego/VistaJuego'
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
        }
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
