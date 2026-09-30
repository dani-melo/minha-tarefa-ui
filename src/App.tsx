import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Identificacao from './pages/Identificacao/Identificacao'
import Home from './pages/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Identificacao />} />
        <Route path="/inicio" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App