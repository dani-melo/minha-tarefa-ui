import React, { useState } from 'react';
import './Disciplinas.css';

export interface Disciplina {
  id: string;
  nome: string;
  cargaHoraria: number;
  qtdTarefas?: number;
}

const disciplinasIniciais: Disciplina[] = [
  { id: '1', nome: 'Computação', cargaHoraria: 60, qtdTarefas: 3 },
  { id: '2', nome: 'Administração da Produção', cargaHoraria: 60, qtdTarefas: 5 },
  { id: '3', nome: 'Administração Financeira', cargaHoraria: 60, qtdTarefas: 2 },
  { id: '4', nome: 'Projeto Interdisciplinar', cargaHoraria: 60, qtdTarefas: 1 },
  { id: '5', nome: 'Eletiva - Competências Digitais', cargaHoraria: 30, qtdTarefas: 1 },
];

export const Disciplinas: React.FC = () => {
  // Lista de disciplinas e busca
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>(disciplinasIniciais);
  const [busca, setBusca] = useState('');

  // Controle de exibição do formulário
  const [exibindoFormulario, setExibindoFormulario] = useState(false);

  // Guarda o ID da disciplina que está sendo editada (null = novo cadastro)
  const [idEmEdicao, setIdEmEdicao] = useState<string | null>(null);

  // Estados dos campos do formulário
  const [nome, setNome] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');

  // Abrir formulário limpo para Nova Disciplina (UI-03)
  const handleAbrirCadastro = () => {
    setIdEmEdicao(null);
    setNome('');
    setCargaHoraria('');
    setExibindoFormulario(true);
  };

  // Abrir formulário preenchido para Editar Disciplina (UI-05)
  const handleAbrirEdicao = (disciplina: Disciplina) => {
    setIdEmEdicao(disciplina.id);
    setNome(disciplina.nome);
    setCargaHoraria(disciplina.cargaHoraria.toString());
    setExibindoFormulario(true);
  };

  // Salvar (serve tanto para criar quanto para atualizar)
  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !cargaHoraria) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (idEmEdicao) {
      // ===== LÓGICA DE EDIÇÃO (UI-05) =====
      setDisciplinas((prev) =>
        prev.map((item) =>
          item.id === idEmEdicao
            ? { ...item, nome, cargaHoraria: Number(cargaHoraria) }
            : item
        )
      );
      alert('Disciplina atualizada com sucesso!');
    } else {
      // ===== LÓGICA DE CADASTRO (UI-03) =====
      const novaDisciplina: Disciplina = {
        id: Date.now().toString(),
        nome,
        cargaHoraria: Number(cargaHoraria),
        qtdTarefas: 0,
      };
      setDisciplinas([novaDisciplina, ...disciplinas]);
      alert('Disciplina cadastrada com sucesso!');
    }

    // Limpar estados e voltar para a listagem (UI-04)
    handleFecharFormulario();
  };

  const handleFecharFormulario = () => {
    setIdEmEdicao(null);
    setNome('');
    setCargaHoraria('');
    setExibindoFormulario(false);
  };

  // Exclusão rápida para manter a lista funcional
  const handleExcluir = (id: string) => {
    if (window.confirm('Deseja realmente excluir esta disciplina?')) {
      setDisciplinas((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Filtragem por busca
  const disciplinasFiltradas = disciplinas.filter((d) =>
    d.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="disciplinas-page">
      {exibindoFormulario ? (
        /* ================= FORMULÁRIO (UI-03 & UI-05) ================= */
        <div className="disciplinas-container">
          <button className="btn-voltar" onClick={handleFecharFormulario}>
            &larr; Voltar
          </button>

          <div className="page-header">
            <h1>{idEmEdicao ? 'Editar disciplina' : 'Nova disciplina'}</h1>
            <p>
              {idEmEdicao
                ? 'Altere as informações da disciplina selecionada.'
                : 'Cadastre as informações da disciplina.'}
            </p>
          </div>

          <div className="card-form-container">
            <form onSubmit={handleSalvar}>
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
                  onClick={handleFecharFormulario}
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
        /* ================= LISTAGEM (UI-04) ================= */
        <div className="disciplinas-container">
          <div className="header-listagem">
            <div>
              <h1>Disciplinas</h1>
              <p>Cadastre e gerencie suas disciplinas.</p>
            </div>
            <button
              className="btn-primario btn-nova-disciplina"
              onClick={handleAbrirCadastro}
            >
              + Nova disciplina
            </button>
          </div>

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
                    <button
                      className="btn-icon btn-editar"
                      title="Editar"
                      onClick={() => handleAbrirEdicao(item)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-icon btn-excluir"
                      title="Excluir"
                      onClick={() => handleExcluir(item.id)}
                    >
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