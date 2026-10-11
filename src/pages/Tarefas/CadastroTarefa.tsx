
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../../layouts/AppLayout'
import { API_URL } from '../../services/api'
import './CadastroTarefa.css'

interface Disciplina {
  id: number
  nome: string
  cargaHoraria: number
}

function CadastroTarefa() {
  const navigate = useNavigate()
  const { id } = useParams()
  const editando = Boolean(id)

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [disciplinaId, setDisciplinaId] = useState('')
  const [dataEntrega, setDataEntrega] = useState('')
  const [prioridade, setPrioridade] = useState('Media')
  const [status, setStatus] = useState('Pendente')

  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([])
  const [carregandoDisciplinas, setCarregandoDisciplinas] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [carregandoTarefa, setCarregandoTarefa] = useState(editando)

  useEffect(() => {
    async function carregarDisciplinas() {
      try {
        const resposta = await fetch(`${API_URL}/disciplinas`)

        if (!resposta.ok) {
          throw new Error('Erro ao carregar disciplinas')
        }

        const dados: Disciplina[] = await resposta.json()
        setDisciplinas(dados)
      } catch {
        setErro('Não foi possível carregar as disciplinas.')
      } finally {
        setCarregandoDisciplinas(false)
      }
    }

    carregarDisciplinas()
  }, [])

  
useEffect(() => {
  if (!editando || !id) return

  async function carregarTarefa() {
    try {
      const resposta = await fetch(`${API_URL}/tarefas/${id}`)

      if (!resposta.ok) {
        throw new Error('Erro ao carregar tarefa')
      }

      const tarefa = await resposta.json()

      setTitulo(tarefa.titulo)
      setDescricao(tarefa.descricao ?? '')
      setDisciplinaId(String(tarefa.disciplinaId))
      setDataEntrega(tarefa.dataEntrega.slice(0, 10))
      setPrioridade(tarefa.prioridade)
      setStatus(tarefa.status)
    } catch {
      setErro('Não foi possível carregar os dados da tarefa.')
    } finally {
      setCarregandoTarefa(false)
    }
  }

  carregarTarefa()
}, [editando, id])


  const voltar = () => {
    if (editando) {
      navigate(`/tarefas/${id}`)
    } else {
      navigate('/tarefas')
    }
  }

  
async function salvarTarefa(evento: FormEvent<HTMLFormElement>) {
  evento.preventDefault()
  setErro('')

  if (carregandoTarefa) {
    return
  }

  if (!titulo.trim() || !disciplinaId || !dataEntrega) {
    setErro('Preencha todos os campos obrigatórios.')
    return
  }

  setSalvando(true)

  try {
    const resposta = await fetch(
      editando
        ? `${API_URL}/tarefas/${id}`
        : `${API_URL}/tarefas`,
      {
        method: editando ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titulo: titulo.trim(),
          descricao: descricao.trim(),
          disciplinaId: Number(disciplinaId),
          dataEntrega: `${dataEntrega}T12:00:00.000Z`,
          prioridade,
          status
        })
      }
    )

    if (!resposta.ok) {
      throw new Error('Erro ao salvar tarefa')
    }

    if (editando) {
      navigate(`/tarefas/${id}`)
    } else {
      navigate('/tarefas')
    }
  } catch {
    setErro('Não foi possível salvar a tarefa. Tente novamente.')
  } finally {
    setSalvando(false)
  }
}

  return (
    <AppLayout>
      <div className="cadastro-tarefa-content">

        <button
          className="voltar-button"
          type="button"
          onClick={voltar}
        >
          ← Voltar
        </button>

        <header className="cadastro-tarefa-header">
          <h2>{editando ? 'Editar tarefa' : 'Nova tarefa'}</h2>

          <p>
            {editando
              ? 'Atualize as informações da tarefa.'
              : 'Cadastre as informações da tarefa.'}
          </p>
        </header>

        <form className="tarefa-form" onSubmit={salvarTarefa}>

          <div className="form-group">
            <label htmlFor="titulo">
              Título da tarefa <span>*</span>
            </label>

            <input
              id="titulo"
              type="text"
              placeholder="Digite o título da tarefa"
              value={titulo}
              onChange={(evento) => setTitulo(evento.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>

            <textarea
              id="descricao"
              placeholder="Digite uma descrição (opcional)"
              rows={4}
              value={descricao}
              onChange={(evento) => setDescricao(evento.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="disciplina">
                Disciplina <span>*</span>
              </label>

              <select
                id="disciplina"
                value={disciplinaId}
                onChange={(evento) => setDisciplinaId(evento.target.value)}
                required
                disabled={carregandoDisciplinas}
              >
                <option value="" disabled>
                  {carregandoDisciplinas
                    ? 'Carregando disciplinas...'
                    : 'Selecione uma disciplina'}
                </option>

                {disciplinas.map((disciplina) => (
                  <option key={disciplina.id} value={disciplina.id}>
                    {disciplina.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dataEntrega">
                Data de entrega <span>*</span>
              </label>

              <input
                id="dataEntrega"
                type="date"
                value={dataEntrega}
                onChange={(evento) => setDataEntrega(evento.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prioridade">Prioridade</label>

              <select
                id="prioridade"
                value={prioridade}
                onChange={(evento) => setPrioridade(evento.target.value)}
              >
                <option value="Baixa">Baixa</option>
                <option value="Media">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>

              <select
                id="status"
                value={status}
                onChange={(evento) => setStatus(evento.target.value)}
              >
                <option value="Pendente">Pendente</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluida">Concluída</option>
              </select>
            </div>
          </div>

          {erro && <p role="alert">{erro}</p>}

          <div className="form-actions">
            <button
              type="button"
              className="cancelar-button"
              onClick={() => navigate('/tarefas')}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="salvar-button"
              disabled={salvando || carregandoDisciplinas || disciplinas.length === 0}
            >
              {salvando
                ? 'Salvando...'
                : editando
                  ? 'Salvar alterações'
                  : 'Salvar'}
            </button>
          </div>

        </form>
      </div>
    </AppLayout>
  )
}

export default CadastroTarefa
