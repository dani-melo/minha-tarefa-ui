import React, { useState } from 'react';
import './Disciplinas.css';

export const DisciplinasCadastro: React.FC = () => {
  const [nome, setNome] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica conforme a regra do projeto
    if (!nome.trim() || !cargaHoraria) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const novaDisciplina = {
      nome,
      cargaHoraria: Number(cargaHoraria),
    };

    console.log('Disciplina cadastrada:', novaDisciplina);
    alert('Disciplina cadastrada com sucesso!');

    // Limpar os campos do formulário
    setNome('');
    setCargaHoraria('');
  };

  const handleCancelar = () => {
    setNome('');
    setCargaHoraria('');
  };

  return (
    <div className="disciplinas-container">
      {/* Botão de navegação para voltar */}
      <button className="btn-voltar" onClick={() => window.history.back()}>
        &larr; Voltar
      </button>

      {/* Cabeçalho da página */}
      <div className="page-header">
        <h1>Nova disciplina</h1>
        <p>Cadastre as informações da disciplina.</p>
      </div>

      {/* Form Card */}
      <div className="card-form-container">
        <form onSubmit={handleSubmit}>
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
              onClick={handleCancelar}
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
  );
};

export default DisciplinasCadastro;