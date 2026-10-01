import { NavLink, useNavigate } from 'react-router-dom'
import './Home.css'


function Home() {
    const navigate = useNavigate()
  return (
    <div className="home-page">

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

      <main className="home-content">
         <header className="home-header">
            <div>
                <h2>Olá!</h2>
                <p>Organize suas disciplinas e tarefas acadêmicas.</p>
            </div>
         </header>

            <section className="resumo">
                <div className="resumo-card">
                    <h3>Disciplinas</h3>
                    <p>0</p>
                </div>

                <div className="resumo-card">
                    <h3>Tarefas pendentes</h3>
                    <p>0</p>
                </div>

                <div className="resumo-card">
                    <h3>Tarefas concluídas</h3>
                    <p>0</p>
                </div>
            </section>

            <section className="acoes-rapidas">
              <h3>Acesso rápido</h3>
                <div className="acoes-container">
                    <NavLink to="/disciplinas" className="acao-card">
                        <span>＋</span>
                        <div>
                        <strong>Disciplinas</strong>
                        <p>Cadastre e organize suas disciplinas.</p>
                        </div>
                    </NavLink>

                    <NavLink to="/tarefas" className="acao-card">
                        <span>✓</span>
                        <div>
                            <strong>Tarefas</strong>
                            <p>Organize e acompanhe suas tarefas.</p>
                        </div>
                    </NavLink>
                </div>
            </section>

      </main>

    </div>
  )
}

export default Home