import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Providers
import AuthProvider from './providers/AuthProvider'

// Paginas
import { LayoutComponent } from './pages/LayoutComponent'
import { HomePage } from './pages/HomePage/HomePage'
import { PaginaNoticias } from './pages/Noticias/PaginaNoticias/PaginaNoticias'
import { PaginaCategorias } from './pages/Categorias/PaginaCategorias/PaginaCategorias'
import { PaginaJuegos } from './pages/Juegos/PaginaJuegos/PaginaJuegos'
import { ErrorElement } from './pages/ErrorElement'
import { Perfil } from './pages/Usuario/Perfil/Perfil'

// ----------- Vistas ------------
import { VistaCategoria } from './pages/Categorias/VistaCategoria/VistaCategoria'
import { VistaNoticia } from './pages/Noticias/VistaNoticia/VistaNoticia'
import { VistaJuego } from './pages/Juegos/VistaJuego/VistaJuego'

// ----------- Vistas de Usuario ------------
import { Login } from './pages/Usuario/Login/Login'
import { Registro } from './pages/Usuario/Registro/Registro'
import { InfoUser } from './pages/Usuario/InfoUser/InfoUser'
import { Biblioteca } from './pages/Usuario/Biblioteca/Biblioteca'
import { SolicitudDesarrollador } from './pages/Usuario/SolicitudDesarrollador/SolicitudDesarrollador'

// ----------- Vistas de Administrador ------------
import { AdminLayoutComponent } from './pages/Administrador/LayoutAdmin/AdminLayoutComponent'
import { AdGames } from './pages/Administrador/Vistas/AdGames/AdGames'
import { AdUsersDev } from './pages/Administrador/Vistas/AdUsersDev/AdUsersDev'
import { AdRequestDev } from './pages/Administrador/Vistas/AdRequestDev/AdRequestDev'
import { AdNews } from './pages/Administrador/Vistas/AdNews/AdNews'
import { VistaFormNews } from './pages/Administrador/Vistas/AdNews/VistaFormNews/VistaFormNews'
import { VistaUpdateNews } from './pages/Administrador/Vistas/AdNews/VistaUpdateNews/VistaUpdateNews'
import { VistaDescuento } from './pages/Administrador/Vistas/AdGames/VistaDescuento/VistaDescuento'

// ----------- Vistas de Developer ------------
import { LayoutDeveloper } from './pages/Developer/LayoutDeveloper/LayoutDeveloper'
import { AdministrarJuegosDeveloper } from './pages/Developer/Vistas/AdministrarJuegosDeveloper/AdministrarJuegosDeveloper'
import { CrearJuego } from './pages/Developer/Vistas/CrearJuego/CrearJuego'
import { Finanzas } from './pages/Developer/Vistas/Finanzas/Finanzas'
import { NoticiasDeveloper } from './pages/Developer/Vistas/NoticiasDeveloper/NoticiasDeveloper'
import { UpdateGame } from './pages/Developer/Vistas/AdministrarJuegosDeveloper/UpdateGame/UpdateGame'

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
          path: 'perfil',
          element: <Perfil />,
          children: [{
            path: '',
            element: <InfoUser />
          },
          {
            path: 'biblioteca', element: <Biblioteca />

          },
          {
            path: 'solicitud-desarrollador',
            element: <SolicitudDesarrollador />
          },
          ]
        }

      ]
    },
    {
      path: 'admin',
      element: <AdminLayoutComponent />,
      children: [
        {
          path: '',
          element: <AdGames />,
          children: [
            {
              path: 'descuento/:id',
              element: <VistaDescuento />
            }
          ]
        },
        {
          path: 'desarrolladores',
          element: <AdUsersDev />
        },
        {
          path: 'solicitudes',
          element: <AdRequestDev />
        },
        {
          path: 'noticias',
          element: <AdNews />,
          children: [
            {
              path: 'crear',
              element: <VistaFormNews />
            },
            {
              path: 'editar/:id',
              element: <VistaUpdateNews />
            }
          ]
        },
      ]
    },
    {
      path: 'dashboard',
      element: <LayoutDeveloper />,
      children: [
        {
          path: '',
          element: <AdministrarJuegosDeveloper />,
          children: [
            {
              path: 'update/:id',
              element: <UpdateGame />
            }
          ]
        },
        {
          path: 'crear',
          element: <CrearJuego />
        },
        {
          path: 'finanzas',
          element: <Finanzas />
        },
        {
          path: 'noticias',
          element: <NoticiasDeveloper />,
          children: [
            {
              path: 'crear',
              element: <VistaFormNews/>
            },
            {
              path: 'editar/:id',
              element: <VistaUpdateNews />
            }
          ]
        },
      ]
    },
    {
      path: '*',
      element: <ErrorElement />
    }
  ])

  return (
    <AuthProvider child={<RouterProvider router={router} />} />
  )
}

export default App
