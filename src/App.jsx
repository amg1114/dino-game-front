import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import { LayoutComponent } from './pages/LayoutComponent'
import { StyleGuidePage } from './pages/StyleGuide/StyleGuide'
import { HomePage } from './pages/HomePage/HomePage'

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <LayoutComponent />,
      children: [
        {
          path: '',
          element: <StyleGuidePage />
        },
        {
          path: '/homepage',
          element: <HomePage />
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
