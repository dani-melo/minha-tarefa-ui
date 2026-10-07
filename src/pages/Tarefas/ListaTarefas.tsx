import { NavLink } from 'react-router-dom'
import AppLayout from '../../layouts/AppLayout'
import './ListaTarefas.css'

function ListaTarefas() {
  return (
    <AppLayout>
      <div className="lista-tarefas-content">

        <header className="lista-tarefas-header">
          <div>
            <h2>Tarefas</h2>
            <p>Gerencie suas tarefas e acompanhe seu progresso.</p>
          </div>

          <NavLink
            to="/tarefas/nova"
            className="nova-tarefa-button"
          >
            + Nova tarefa
          </NavLink>
        </header>

        <section className="tarefas-filtros">
          <input
            type="search"
            placeholder="Buscar tarefa..."
            aria-label="Buscar tarefa"
          />

          <select defaultValue="">
            <option value="">
              Todas as disciplinas
            </option>
          </select>

          <select defaultValue="">
            <option value="">
              Todos os status
            </option>

            <option value="pendente">
              Pendente
            </option>

            <option value="em-andamento">
              Em andamento
            </option>

            <option value="concluida">
              Concluída
            </option>
          </select>
        </section>

        <section className="lista-tarefas-vazia">
            <div className="lista-vazia-icon">📋</div>

            <h3>Nenhuma tarefa cadastrada</h3>

            <p>
                Cadastre sua primeira tarefa para começar a organizar seus estudos.
            </p>

            <NavLink
                to="/tarefas/nova"
                className="lista-vazia-button"
            >
                + Nova tarefa
            </NavLink>
        </section>

      </div>
    </AppLayout>
  )
}

export default ListaTarefas