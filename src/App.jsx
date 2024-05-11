import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Componentes
import { LayoutComponent } from './pages/LayoutComponent'

// Paginas
import { HomePage } from './pages/HomePage/HomePage'
import { PaginaNoticias } from './pages/Noticias/PaginaNoticias/PaginaNoticias'
import { PaginaCategorias } from './pages/Categorias/PaginaCategorias/PaginaCategorias'
import { PaginaJuegos } from './pages/Juegos/PaginaJuegos/PaginaJuegos'
import { StyleGuidePage } from './pages/StyleGuide/StyleGuide'
import { Perfil } from './pages/Usuario/Perfil/Perfil'

// Vistas
import { VistaNoticia } from './pages/Noticias/VistaNoticia/VistaNoticia'
import { VistaJuego } from './pages/Juegos/VistaJuego/VistaJuego'
import { VistaCategoria } from './pages/Categorias/VistaCategoria/VistaCategoria'
import { Login } from './pages/Usuario/Login/Login'
import { Registro } from './pages/Usuario/Registro/Registro'
import AuthProvider from './providers/AuthProvider'
import { InfoUser } from './pages/Usuario/InfoUser/InfoUser'
import { Biblioteca } from './pages/Usuario/Biblioteca/Biblioteca'
import { SolicitudDesarrollador } from './pages/Usuario/SolicitudDesarrollador/SolicitudDesarrollador'

function App() {
  // /juegos/
  const router = createBrowserRouter([
    {
      path: '',
      element: <LayoutComponent />,
      children: [
        {
          path: '',
          element: <HomePage />,
          children: [
            {
              path: 'login',
              element: <Login />
            },
            {
              path: 'register',
              element: <Registro />
            }
          ]
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
        },
        {
          path: 'categorias/:id',
          element: <VistaCategoria />
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
        {
          path: 'perfil',
          element: <Perfil />,
          children: [
            {
              path: 'biblioteca',
              element: <Biblioteca />
            },
            {
              path: 'solicitud-desarrollador',
              element: <SolicitudDesarrollador />
            },
            {
              path: '',
              element: <InfoUser />
            }

          ]
        },
        
      ]
    }
  ])

  return (
    <AuthProvider child={<RouterProvider router={router} />} />
  )
}

export default App
