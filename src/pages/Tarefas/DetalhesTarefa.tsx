
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../../layouts/AppLayout'
import { API_URL } from '../../services/api'
import './DetalhesTarefa.css'

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

function DetalhesTarefa() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [tarefa, setTarefa] = useState<Tarefa | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [salvandoStatus, setSalvandoStatus] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregarTarefa() {
      try {
        const resposta = await fetch(`${API_URL}/tarefas/${id}`)

        if (!resposta.ok) {
          throw new Error('Não foi possível carregar a tarefa.')
        }

        const dados: Tarefa = await resposta.json()
        setTarefa(dados)
      } catch {
        setErro('Não foi possível carregar os detalhes da tarefa.')
      } finally {
        setCarregando(false)
      }
    }

    if (id && /^\d+$/.test(id)) {
      carregarTarefa()
    } else {
      setErro('Identificador da tarefa inválido.')
      setCarregando(false)
    }
  }, [id])

  async function alterarStatus(novoStatus: string) {
    if (!tarefa || salvandoStatus) return

    setErro('')
    setSalvandoStatus(true)

    try {
      const resposta = await fetch(`${API_URL}/tarefas/${tarefa.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: novoStatus
        })
      })

      if (!resposta.ok) {
        throw new Error('Erro ao atualizar status.')
      }

      const tarefaAtualizada: Tarefa = await resposta.json()
      setTarefa(tarefaAtualizada)
    } catch {
      setErro('Não foi possível atualizar o status.')
    } finally {
      setSalvandoStatus(false)
    }
  }

  function classeStatus(status: string) {
    if (status === 'Em andamento') return 'em-andamento'
    if (status === 'Concluida') return 'concluida'
    return 'pendente'
  }

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

        {carregando && <p>Carregando tarefa...</p>}

        {erro && <p role="alert">{erro}</p>}

        {!carregando && tarefa && (
          <section className="detalhes-tarefa-card">

            <div className="detalhes-card-topo">

              <h3>{tarefa.titulo}</h3>

              <div className="detalhes-acoes">

                <select
                  className={`status-tarefa status-${classeStatus(tarefa.status)}`}
                  value={tarefa.status}
                  onChange={(evento) => alterarStatus(evento.target.value)}
                  disabled={salvandoStatus}
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Em andamento">Em andamento</option>
                  <option value="Concluida">Concluída</option>
                </select>

                <button
                  type="button"
                  className="editar-tarefa-button"
                  onClick={() => navigate(`/tarefas/${tarefa.id}/editar`)}
                >
                  ✏️ Editar
                </button>

                <button
                  type="button"
                  className="excluir-tarefa-button"
                  disabled
                  title="Exclusão disponível em uma próxima etapa"
                >
                  🗑️ Excluir
                </button>

              </div>
            </div>

            <div className="detalhes-informacoes">

              <div className="detalhe-item">
                <span>Disciplina</span>
                <strong>{tarefa.disciplina.nome}</strong>
              </div>

              <div className="detalhe-item">
                <span>Data de entrega</span>
                <strong>
                  {new Date(tarefa.dataEntrega).toLocaleDateString(
                    'pt-BR',
                    { timeZone: 'UTC' }
                  )}
                </strong>
              </div>

              <div className="detalhe-item">
                <span>Prioridade</span>
                <strong>
                  {tarefa.prioridade === 'Media'
                    ? 'Média'
                    : tarefa.prioridade}
                </strong>
              </div>

            </div>

            <div className="detalhes-descricao">
              <span>Descrição</span>
              <p>
                {tarefa.descricao || 'Nenhuma descrição informada.'}
              </p>
            </div>

          </section>
        )}

      </div>
    </AppLayout>
  )
}

export default DetalhesTarefa
