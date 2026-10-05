import { NavLink, useLocation } from 'react-router-dom'
import AppLayout from '../../layouts/AppLayout'
import './Home.css'

function Home() {
  const location = useLocation()
  const nome = location.state?.nome

  const dataAtual = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <AppLayout>
      <div className="home-content">

        <header className="home-header">
          <div>
            <h2>Olá, {nome}!👋</h2>
            <p>Organize suas disciplinas e acompanhe suas tarefas.</p>
          </div>

          <span className="home-date">{dataAtual}</span>
        </header>

        <section className="acessos">
          <NavLink to="/disciplinas" className="acesso-card">
            <div className="acesso-icon">📖</div>

            <div className="acesso-info">
              <h3>Disciplinas</h3>
              <p>Cadastre suas disciplinas e mantenha seus estudos organizados.</p>
              <span className="acesso-link">Acessar</span>
            </div>
          </NavLink>

          <NavLink to="/tarefas" className="acesso-card">
            <div className="acesso-icon">📋</div>

            <div className="acesso-info">
              <h3>Tarefas</h3>
              <p>
                Organize suas tarefas e acompanhe seu progresso.
              </p>
              <span className="acesso-link">Acessar</span>
            </div>
          </NavLink>
        </section>

        <section className="resumo-section">
          <h3 className="section-title">Resumo</h3>

          <div className="resumo">

            <div className="resumo-card">
                <div className="resumo-icon">📖</div>

                <div className="resumo-info">
                <strong>0</strong>
                <span>Disciplinas</span>
                </div>
            </div>

            <div className="resumo-card">
                <div className="resumo-icon">📋</div>

                <div className="resumo-info">
                <strong>0</strong>
                <span>Tarefas</span>
                </div>
            </div>

            <div className="resumo-card">
                <div className="resumo-icon">⏰</div>

                <div className="resumo-info">
                <strong>0</strong>
                <span>Pendentes</span>
                </div>
            </div>

            <div className="resumo-card">
                <div className="resumo-icon">✅</div>

                <div className="resumo-info">
                <strong>0</strong>
                <span>Concluídas</span>
                </div>
            </div>

            </div>
        </section>

        <section className="proximas-tarefas">

          <div className="section-header">
            <h3 className="section-title">
              Próximas tarefas
            </h3>

            <NavLink
              to="/tarefas"
              className="ver-todas"
            >
              Ver todas
            </NavLink>
          </div>

          <div className="tarefas-vazio">
            <div className="tarefas-vazio-icon">
              📋
            </div>

            <p>Nenhuma tarefa cadastrada ainda.</p>
          </div>

        </section>

      </div>
    </AppLayout>
  )
}

export default Home