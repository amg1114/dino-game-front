import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import { LayoutComponent } from './pages/LayoutComponent'
import { StyleGuidePage } from './pages/StyleGuide/StyleGuide'

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <LayoutComponent />,
      children: [
        {
          path: '',
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
