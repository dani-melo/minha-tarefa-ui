import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Identificacao from './pages/Identificacao/Identificacao'
import Home from './pages/Home/Home'
import CadastroTarefa from './pages/Tarefas/CadastroTarefa'
import ListaTarefas from './pages/Tarefas/ListaTarefas'
import DetalhesTarefa from './pages/Tarefas/DetalhesTarefa'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Identificacao />} />
        <Route path="/inicio" element={<Home />} />

        <Route path="/tarefas/nova" element={<CadastroTarefa />} />
        <Route path="/tarefas" element={<ListaTarefas />} />
        <Route path="/tarefas/:id" element={<DetalhesTarefa />} />
        <Route path="/tarefas/:id/editar" element={<CadastroTarefa />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App