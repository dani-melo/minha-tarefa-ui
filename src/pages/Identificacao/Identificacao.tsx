import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Identificacao.css'


function Identificacao() {
  const [nome, setNome] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!nome.trim()) {
      alert('Digite seu nome para continuar.')
      return
    }

    navigate('/inicio')
  }

  return (
    <main className="identificacao-page">
      <header className="app-header">
        <div className="logo">
          <div className="logo-icon">✓</div>

          <div>
            <h1>Minha Tarefa</h1>
            <p>Organize seus estudos em um só lugar</p>
          </div>
        </div>
      </header>

      <section className="identificacao-container">
        <div className="identificacao-card">
          <div className="user-icon">👤</div>

          <h2>Seja bem-vindo!</h2>

          <p className="descricao">
            Para começar, diga como podemos chamar você.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="nome">Seu nome</label>

            <input
              id="nome"
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />

            <button type="submit">
              Continuar
              <span>→</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Identificacao