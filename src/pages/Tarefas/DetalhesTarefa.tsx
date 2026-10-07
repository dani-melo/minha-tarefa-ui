import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../layouts/AppLayout'
import './DetalhesTarefa.css'

function DetalhesTarefa() {
  const navigate = useNavigate()

  const [confirmarExclusao, setConfirmarExclusao] = useState(false)

  const [status, setStatus] = useState('pendente')

  return (
    <AppLayout>
      <div className="detalhes-tarefa-content">

        <button
          type="button"
          className="detalhes-voltar-button"
          onClick={() => navigate('/tarefas')}
        >
          ← Voltar
        </button>

        <header className="detalhes-tarefa-header">
          <h2>Detalhes da tarefa</h2>
        </header>

        <section className="detalhes-tarefa-card">

          <div className="detalhes-card-topo">

            <h3>Título da tarefa</h3>

            <div className="detalhes-acoes">
                <select
                  className={`status-tarefa status-${status}`}
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option value="pendente">Pendente</option>
                  <option value="em-andamento">Em andamento</option>
                  <option value="concluida">Concluída</option>
                </select>

                <button
                  type="button"
                  className="editar-tarefa-button"
                  onClick={() => navigate('/tarefas/1/editar')}
                >
                  ✏️ Editar
                </button>

                <button
                  type="button"
                  className="excluir-tarefa-button"
                  onClick={() => setConfirmarExclusao(true)}
                >
                  🗑️ Excluir
                </button>
            </div>

          </div>

          <div className="detalhes-informacoes">

            <div className="detalhe-item">
              <span>Disciplina</span>
              <strong>—</strong>
            </div>

            <div className="detalhe-item">
              <span>Data de entrega</span>
              <strong>—</strong>
            </div>

            <div className="detalhe-item">
              <span>Prioridade</span>
              <strong>—</strong>
            </div>

          </div>

          <div className="detalhes-descricao">
            <span>Descrição</span>
            <p>Nenhuma descrição informada.</p>
          </div>

        </section>

        {confirmarExclusao && (
          <div className="confirmacao-exclusao">
            <div className="confirmacao-exclusao-card">

              <h3>Excluir tarefa?</h3>

              <p>
                Tem certeza de que deseja excluir esta tarefa?
                Esta ação não poderá ser desfeita.
              </p>

              <div className="confirmacao-exclusao-acoes">
                <button
                  type="button"
                  className="cancelar-exclusao-button"
                  onClick={() => setConfirmarExclusao(false)}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="confirmar-exclusao-button"
                >
                  Excluir
                </button>
              </div>

            </div>
          </div>
       )}

      </div>
    </AppLayout>
  )
}

export default DetalhesTarefa