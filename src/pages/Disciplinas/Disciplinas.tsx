
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Disciplinas.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import AppLayout from "../../layouts/AppLayout";

const API_URL = "http://localhost:3000";

type Disciplina = {
  id: number;
  nome: string;
  cargaHoraria: number;
};

type Tarefa = {
  id: number;
  disciplinaId: number;
};

export default function Disciplinas() {
  const navigate = useNavigate();
  const { id } = useParams();

  const editando = Boolean(id);
  const naPaginaFormulario =
    window.location.pathname.endsWith("/nova") ||
    window.location.pathname.endsWith("/editar");

  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [nome, setNome] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregarDisciplinas() {
    setCarregando(true);
    setErro("");

    try {
      const [resDisciplinas, resTarefas] = await Promise.all([
        fetch(`${API_URL}/disciplinas`),
        fetch(`${API_URL}/tarefas`),
      ]);

      if (!resDisciplinas.ok) {
        throw new Error("Não foi possível carregar as disciplinas.");
      }

      const dados = await resDisciplinas.json();
      setDisciplinas(dados);

      if (resTarefas.ok) {
        setTarefas(await resTarefas.json());
      }
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao carregar disciplinas."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDisciplinas();
  }, []);

  useEffect(() => {
    if (!editando || disciplinas.length === 0) return;

    const disciplina = disciplinas.find(
      (item) => item.id === Number(id)
    );

    if (disciplina) {
      setNome(disciplina.nome);
      setCargaHoraria(String(disciplina.cargaHoraria));
    }
  }, [id, editando, disciplinas]);

  const disciplinasFiltradas = useMemo(() => {
    return disciplinas.filter((disciplina) => {
      const correspondeBusca = disciplina.nome
        .toLowerCase()
        .includes(busca.toLowerCase());

      const quantidade = tarefas.filter(
        (tarefa) => tarefa.disciplinaId === disciplina.id
      ).length;

      const correspondeFiltro =
        filtro === "todos" ||
        (filtro === "com" && quantidade > 0) ||
        (filtro === "sem" && quantidade === 0);

      return correspondeBusca && correspondeFiltro;
    });
  }, [disciplinas, tarefas, busca, filtro]);

  async function salvarDisciplina(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setErro("");

    if (!nome.trim()) {
      setErro("Informe o nome da disciplina.");
      return;
    }

    const carga = Number(cargaHoraria);

    if (!Number.isInteger(carga) || carga <= 0) {
      setErro("Informe uma carga horária válida.");
      return;
    }

    setSalvando(true);

    try {
      const url = editando
        ? `${API_URL}/disciplinas/${id}`
        : `${API_URL}/disciplinas`;

      const resposta = await fetch(url, {
        method: editando ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome.trim(),
          cargaHoraria: carga,
        }),
      });

      if (!resposta.ok) {
        const dados = await resposta.json().catch(() => null);
        throw new Error(
          dados?.erro ||
          dados?.message ||
          "Não foi possível salvar a disciplina."
        );
      }

      navigate("/disciplinas");
      window.location.reload();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao salvar disciplina."
      );
    } finally {
      setSalvando(false);
    }
  }

  async function excluirDisciplina(disciplina: Disciplina) {
    const quantidade = tarefas.filter(
      (tarefa) => tarefa.disciplinaId === disciplina.id
    ).length;

    const mensagem =
      quantidade > 0
        ? `A disciplina "${disciplina.nome}" possui ${quantidade} tarefa(s). Deseja tentar excluí-la?`
        : `Deseja excluir a disciplina "${disciplina.nome}"?`;

    if (!window.confirm(mensagem)) return;

    setErro("");

    try {
      const resposta = await fetch(
        `${API_URL}/disciplinas/${disciplina.id}`,
        { method: "DELETE" }
      );

      if (!resposta.ok) {
        throw new Error(
          "Não foi possível excluir. Verifique se a disciplina possui tarefas vinculadas."
        );
      }

      await carregarDisciplinas();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao excluir disciplina."
      );
    }
  }

  const cores = [
    "azul",
    "verde",
    "roxo",
    "laranja",
    "rosa",
  ];

  if (naPaginaFormulario) {
    return (
    <AppLayout>  
      <main className="disciplinas-pagina">
        <button
          className="disciplinas-voltar"
          onClick={() => navigate("/disciplinas")}
        >
          ← Voltar
        </button>

        <header className="disciplinas-cabecalho">
          <h1>{editando ? "Editar disciplina" : "Nova disciplina"}</h1>
          <p>
            {editando
              ? "Atualize as informações da disciplina."
              : "Cadastre as informações da disciplina."}
          </p>
        </header>

        <form
          className="disciplinas-formulario"
          onSubmit={salvarDisciplina}
        >
          <label htmlFor="nomeDisciplina">
            Nome da disciplina <span>*</span>
          </label>
          <input
            id="nomeDisciplina"
            type="text"
            placeholder="Digite o nome da disciplina"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />

          <label htmlFor="cargaDisciplina">
            Carga horária <span>*</span>
          </label>
          <input
            id="cargaDisciplina"
            type="number"
            min="1"
            step="1"
            placeholder="Digite a carga horária (ex.: 60)"
            value={cargaHoraria}
            onChange={(event) =>
              setCargaHoraria(event.target.value)
            }
            required
          />

          {erro && <p className="disciplinas-erro">{erro}</p>}

          <div className="disciplinas-acoes-formulario">
            <button
              type="button"
              className="disciplinas-btn-cancelar"
              onClick={() => navigate("/disciplinas")}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="disciplinas-btn-salvar"
              disabled={salvando || (editando && carregando)}
            >
              {salvando ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </main>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
    <main className="disciplinas-pagina">
      <header className="disciplinas-topo">
        <div>
          <h1>Disciplinas</h1>
          <p>Cadastre e gerencie suas disciplinas.</p>
        </div>

        <button
          className="disciplinas-btn-nova"
          onClick={() => navigate("/disciplinas/nova")}
        >
          + Nova disciplina
        </button>
      </header>

      <div className="disciplinas-filtros">
        <div className="disciplinas-busca">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Buscar disciplina..."
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
          />
        </div>

        <select
          value={filtro}
          onChange={(event) => setFiltro(event.target.value)}
          aria-label="Filtrar disciplinas"
        >
          <option value="todos">Todos</option>
          <option value="com">Com tarefas</option>
          <option value="sem">Sem tarefas</option>
        </select>
      </div>

      {erro && <p className="disciplinas-erro">{erro}</p>}

      <section className="disciplinas-lista">
        {carregando ? (
          <p className="disciplinas-vazio">
            Carregando disciplinas...
          </p>
        ) : disciplinasFiltradas.length === 0 ? (
          <p className="disciplinas-vazio">
            Nenhuma disciplina encontrada.
          </p>
        ) : (
          disciplinasFiltradas.map((disciplina, index) => {
            const quantidade = tarefas.filter(
              (tarefa) =>
                tarefa.disciplinaId === disciplina.id
            ).length;

            return (
              <article
                className="disciplinas-item"
                key={disciplina.id}
              >
                <div
                  className={`disciplinas-icone ${
                    cores[index % cores.length]
                  }`}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 6.5c-2.5-1.5-5-1.8-9-1.5v13c4-.3 6.5 0 9 1.5 2.5-1.5 5-1.8 9-1.5V5c-4-.3-6.5 0-9 1.5Z" />
                    <path d="M12 6.5v13" />
                  </svg>
                </div>

                <div className="disciplinas-info">
                  <h3>{disciplina.nome}</h3>
                  <div className="disciplinas-metadados">
                    <span>
                      Carga horária: {disciplina.cargaHoraria}h
                    </span>
                    <span>
                      {quantidade}{" "}
                      {quantidade === 1 ? "tarefa" : "tarefas"}
                    </span>
                  </div>
                </div>

                <div className="disciplinas-acoes">
                  <button
                    className="disciplinas-btn-editar"
                    title="Editar disciplina"
                    aria-label={`Editar ${disciplina.nome}`}
                    onClick={() =>
                      navigate(
                        `/disciplinas/${disciplina.id}/editar`
                      )
                    }
                  >
                    ✎
                  </button>

                  <button
                    className="disciplinas-btn-excluir"
                    title="Excluir disciplina"
                    aria-label={`Excluir ${disciplina.nome}`}
                    onClick={() =>
                      excluirDisciplina(disciplina)
                    }
                  >
                    ♜
                  </button>
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
    </AppLayout>
  );
}
