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
          <span>🏠 Início</span>
        </NavLink>

        <NavLink
          to="/disciplinas"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <span>📖 Disciplinas</span>
        </NavLink>

        <NavLink
          to="/tarefas"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          <span>📋 Tarefas</span>
        </NavLink>
      </nav>

      <button
        className="sair-button"
        onClick={() => navigate('/')}
      >
        <span>🚪 Sair</span>
      </button>
    </aside>
  )
}

export default Sidebar