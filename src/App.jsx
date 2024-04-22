import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LayoutComponent } from './pages/LayoutComponent'
import { StyleGuidePage } from './pages/StyleGuide/StyleGuide'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path='/' element={<LayoutComponent />}>
            <Route path='style-guide' element={<StyleGuidePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
