import { NavLink, useNavigate } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="sidebar">
        <div className="sidebar-logo">
        <div className="sidebar-logo-icon">✓</div>
        <h1>Minha Tarefa</h1>
      </div>

      <nav className="sidebar-menu">
        <NavLink
          to="/inicio"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Início
        </NavLink>

        <NavLink
          to="/disciplinas"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Disciplinas
        </NavLink>

        <NavLink
          to="/tarefas"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Tarefas
        </NavLink>
      </nav>

      <button
        className="sair-button"
        onClick={() => navigate('/')}
      >
        Sair
      </button>
    </aside>
  )
}

export default Sidebar