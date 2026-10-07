import { useNavigate,useParams } from 'react-router-dom'
import AppLayout from '../../layouts/AppLayout'
import './CadastroTarefa.css'

function CadastroTarefa() {
  const navigate = useNavigate()
  const { id } = useParams()
  const editando = Boolean(id)

  const voltar = () => {
  if (editando) {
    navigate(`/tarefas/${id}`)
  } else {
    navigate('/tarefas')
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

        <form className="tarefa-form">

            <div className="form-group">
                <label htmlFor="titulo">
                Título da tarefa <span>*</span>
                </label>

                <input
                id="titulo"
                type="text"
                placeholder="Digite o título da tarefa"
                />
            </div>

            <div className="form-group">
                <label htmlFor="descricao">Descrição</label>

                <textarea
                id="descricao"
                placeholder="Digite uma descrição (opcional)"
                rows={4}
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                <label htmlFor="disciplina">
                    Disciplina <span>*</span>
                </label>

                <select id="disciplina" defaultValue="">
                    <option value="" disabled>
                    Selecione uma disciplina
                    </option>
                </select>
                </div>

                <div className="form-group">
                <label htmlFor="dataEntrega">
                    Data de entrega <span>*</span>
                </label>

                <input
                    id="dataEntrega"
                    type="date"
                />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                <label htmlFor="prioridade">Prioridade</label>

                <select id="prioridade" defaultValue="">
                    <option value="" disabled>
                    Selecione
                    </option>
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                </select>
                </div>

                <div className="form-group">
                <label htmlFor="status">Status</label>

                <select id="status" defaultValue="pendente">
                    <option value="pendente">Pendente</option>
                    <option value="em-andamento">Em andamento</option>
                    <option value="concluida">Concluída</option>
                </select>
                </div>
            </div>

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
                >
                {editando ? 'Salvar alterações' : 'Salvar'}
                </button>
            </div>

            </form>
      </div>
    </AppLayout>
  )
}

export default CadastroTarefa