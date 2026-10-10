import React, { useState } from 'react';
import './Disciplinas.css';

// Interface representando a estrutura da Disciplina
export interface Disciplina {
  id: string;
  nome: string;
  cargaHoraria: number;
  qtdTarefas?: number;
}

// Dados iniciais de exemplo (de acordo com o protótipo do projeto)
const disciplinasIniciais: Disciplina[] = [
  { id: '1', nome: 'Computação', cargaHoraria: 60, qtdTarefas: 3 },
  { id: '2', nome: 'Administração da Produção', cargaHoraria: 60, qtdTarefas: 5 },
  { id: '3', nome: 'Administração Financeira', cargaHoraria: 60, qtdTarefas: 2 },
  { id: '4', nome: 'Projeto Interdisciplinar', cargaHoraria: 60, qtdTarefas: 1 },
  { id: '5', nome: 'Eletiva - Competências Digitais', cargaHoraria: 30, qtdTarefas: 1 },
];

export const Disciplinas: React.FC = () => {
  // Estado para controlar as disciplinas e a visualização da tela
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>(disciplinasIniciais);
  const [exibindoFormulario, setExibindoFormulario] = useState(false);
  const [busca, setBusca] = useState('');

  // Estados do Formulário de Cadastro (UI-03)
  const [nome, setNome] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');

  // Handler para cadastrar nova disciplina
  const handleCadastrar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !cargaHoraria) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const novaDisciplina: Disciplina = {
      id: Date.now().toString(),
      nome,
      cargaHoraria: Number(cargaHoraria),
      qtdTarefas: 0,
    };

    setDisciplinas([novaDisciplina, ...disciplinas]);
    alert('Disciplina cadastrada com sucesso!');

    // Resetar formulário e voltar para a listagem
    setNome('');
    setCargaHoraria('');
    setExibindoFormulario(false);
  };

  // Filtragem local por busca
  const disciplinasFiltradas = disciplinas.filter((d) =>
    d.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="disciplinas-page">
      {exibindoFormulario ? (
        /* ================= UI-03: CADASTRO DE DISCIPLINA ================= */
        <div className="disciplinas-container">
          <button className="btn-voltar" onClick={() => setExibindoFormulario(false)}>
            &larr; Voltar
          </button>

          <div className="page-header">
            <h1>Nova disciplina</h1>
            <p>Cadastre as informações da disciplina.</p>
          </div>

          <div className="card-form-container">
            <form onSubmit={handleCadastrar}>
              <div className="form-group">
                <label htmlFor="nome">Nome da disciplina *</label>
                <input
                  id="nome"
                  type="text"
                  placeholder="Digite o nome da disciplina"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cargaHoraria">Carga horária *</label>
                <input
                  id="cargaHoraria"
                  type="number"
                  placeholder="Digite a carga horária (ex.: 60)"
                  value={cargaHoraria}
                  onChange={(e) => setCargaHoraria(e.target.value)}
                  min="1"
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secundario"
                  onClick={() => setExibindoFormulario(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primario">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* ================= UI-04: VISUALIZAÇÃO DE DISCIPLINAS ================= */
        <div className="disciplinas-container">
          <div className="header-listagem">
            <div>
              <h1>Disciplinas</h1>
              <p>Cadastre e gerencie suas disciplinas.</p>
            </div>
            <button
              className="btn-primario btn-nova-disciplina"
              onClick={() => setExibindoFormulario(true)}
            >
              + Nova disciplina
            </button>
          </div>

          {/* Barra de Filtros e Busca */}
          <div className="toolbar-disciplinas">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Buscar disciplina..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
          </div>

          {/* Lista de Cards de Disciplina */}
          <div className="disciplinas-lista">
            {disciplinasFiltradas.length === 0 ? (
              <div className="disciplina-empty">
                <p>Nenhuma disciplina encontrada.</p>
              </div>
            ) : (
              disciplinasFiltradas.map((item) => (
                <div className="disciplina-card" key={item.id}>
                  <div className="disciplina-info">
                    <div className="disciplina-icon">📘</div>
                    <div className="disciplina-detalhes">
                      <h3>{item.nome}</h3>
                      <div className="disciplina-meta">
                        <span>Carga horária: {item.cargaHoraria}h</span>
                        {item.qtdTarefas !== undefined && (
                          <span className="dot-separator">•</span>
                        )}
                        {item.qtdTarefas !== undefined && (
                          <span>{item.qtdTarefas} tarefas</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="disciplina-acoes">
                    <button className="btn-icon btn-editar" title="Editar">
                      ✏️
                    </button>
                    <button className="btn-icon btn-excluir" title="Excluir">
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Disciplinas;