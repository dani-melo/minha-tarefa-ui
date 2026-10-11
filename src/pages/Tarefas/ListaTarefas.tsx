
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import AppLayout from '../../layouts/AppLayout'
import { API_URL } from '../../services/api'
import './ListaTarefas.css'

interface Tarefa {
  id: number
  titulo: string
  descricao: string | null
  dataEntrega: string
  prioridade: string
  status: string
  disciplina: {
    id: number
    nome: string
  }
}

function ListaTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregarTarefas() {
      try {
        const resposta = await fetch(`${API_URL}/tarefas`)

        if (!resposta.ok) {
          throw new Error('Erro ao buscar tarefas')
        }

        const dados: Tarefa[] = await resposta.json()
        setTarefas(dados)
      } catch {
        setErro('Não foi possível carregar as tarefas.')
      } finally {
        setCarregando(false)
      }
    }

    carregarTarefas()
  }, [])

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
            <option value="">Todas as disciplinas</option>
          </select>

          <select defaultValue="">
            <option value="">Todos os status</option>
            <option value="pendente">Pendente</option>
            <option value="em-andamento">Em andamento</option>
            <option value="concluida">Concluída</option>
          </select>
        </section>

        {carregando && <p>Carregando tarefas...</p>}

        {erro && <p role="alert">{erro}</p>}

        {!carregando && !erro && tarefas.length === 0 && (
          <section className="lista-tarefas-vazia">
            <div className="lista-vazia-icon">📋</div>

            <h3>Nenhuma tarefa cadastrada</h3>

            <p>
              Cadastre sua primeira tarefa para começar
              a organizar seus estudos.
            </p>

            <NavLink
              to="/tarefas/nova"
              className="lista-vazia-button"
            >
              + Nova tarefa
            </NavLink>
          </section>
        )}

        
          {!carregando && !erro && tarefas.length > 0 && (
            <section className="tarefas-listagem">
              {tarefas.map((tarefa) => (
                <article className="tarefa-card" key={tarefa.id}>
                  <div>
                    <h3>{tarefa.titulo}</h3>
                    <p>{tarefa.disciplina.nome}</p>
                  </div>

                  <div>
                    <p>
                      Entrega:{' '}
                      {new Date(tarefa.dataEntrega).toLocaleDateString(
                        'pt-BR',
                        { timeZone: 'UTC' }
                      )}
                    </p>
                  </div>

                  <div>
                    <span
                        className={`tarefa-status ${
                          tarefa.status === 'Pendente'
                            ? 'status-pendente'
                            : tarefa.status === 'Em andamento'
                              ? 'status-andamento'
                              : 'status-concluida'
                        }`}
                      >
                        {tarefa.status === 'Concluida'
                          ? 'Concluída'
                          : tarefa.status}
                    </span>
                  </div>

                  <div className="tarefa-acoes">
                    <NavLink to={`/tarefas/${tarefa.id}`}>
                      Ver detalhes
                    </NavLink>
                  </div>
                </article>
              ))}
            </section>
          )}


      </div>
    </AppLayout>
  )
}

export default ListaTarefas
