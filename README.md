# Minha Tarefa

Aplicação web desenvolvida para auxiliar estudantes na organização de suas disciplinas e tarefas acadêmicas.

O sistema permite cadastrar disciplinas, registrar atividades, acompanhar prazos e atualizar o andamento das tarefas, proporcionando uma organização simples e prática dos estudos.

## 1. Objetivo

Desenvolver uma aplicação web que facilite o gerenciamento de disciplinas e tarefas acadêmicas, permitindo que estudantes organizem seus estudos, acompanhem atividades e consultem informações em um único ambiente.

## 2. Tecnologias utilizadas

### Frontend
- React
- TypeScript
- Vite
- CSS
- React Router
- Fetch API

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL (Supabase)

### Ferramentas de desenvolvimento
- Visual Studio Code
- Git
- GitHub
- Postman
- Trello

## 3. Funcionalidades implementadas

### 3.1. Identificação do estudante

- Tela inicial de identificação.
- Campo para informar o nome do estudante.
- Acesso inicial à aplicação sem autenticação.

**Observação:** inicialmente, o projeto foi desenvolvido com identificação apenas pelo nome. Entretanto, durante o desenvolvimento, identificou-se a necessidade de implementar autenticação para garantir que cada estudante tenha acesso somente às suas disciplinas e tarefas.

Por esse motivo, foi definida como melhoria futura a implementação de **login com conta Google (Gmail)**, substituindo o modelo atual de identificação.

### 3.2. Página inicial (Home)

- Mensagem de boas-vindas.
- Exibição da data atual.
- Acesso às páginas de disciplinas e tarefas.
- Estrutura visual com resumo acadêmico.
- Seção destinada às próximas tarefas.

**Observação:** os indicadores de disciplinas, tarefas pendentes e concluídas ainda apresentam valores estáticos. A integração desses indicadores com a API será realizada posteriormente.

### 3.3. Gerenciamento de disciplinas

- Cadastro de disciplinas.
- Listagem das disciplinas cadastradas.
- Edição do nome e da carga horária.
- Exclusão de disciplinas.
- Pesquisa pelo nome da disciplina.
- Filtro de disciplinas com ou sem tarefas.
- Exibição da quantidade de tarefas vinculadas.
- Atualização da listagem após o cadastro ou a edição.

As operações estão integradas à API REST, com armazenamento das informações no banco de dados PostgreSQL.

### 3.4. Gerenciamento de tarefas

- Cadastro de tarefas.
- Listagem das tarefas cadastradas.
- Visualização dos detalhes de uma tarefa.
- Edição das informações.
- Atualização do status da tarefa.
- Associação de tarefas às disciplinas cadastradas.
- Registro de título, descrição, data de entrega e prioridade.
- Exibição do status da tarefa na interface.

Os dados são enviados e recuperados por meio da API REST, garantindo persistência no banco de dados.

### 3.5. Navegação e interface

- Menu lateral com as opções Início, Disciplinas, Tarefas e Sair.
- Ícones nas opções do menu.
-Navegação entre páginas utilizando React Router.

Formulários de cadastro e edição.

Interface organizada com CSS.

Adaptações para diferentes tamanhos de tela.

Observação: atualmente, a opção Sair retorna à tela de identificação. O encerramento de uma sessão autenticada será implementado juntamente com o login Google.

4. Integração com a API

O frontend utiliza requisições HTTP para se comunicar com a API REST desenvolvida em Node.js e Express.

4.1. Endpoints de disciplinas

Método

Endpoint

Funcionalidade

POST

/disciplinas

Cadastrar disciplina

GET

/disciplinas

Listar disciplinas

PUT

/disciplinas/:id

Atualizar disciplina

DELETE

/disciplinas/:id

Excluir disciplina

4.2. Endpoints de tarefas

Método

Endpoint

Funcionalidade

POST

/tarefas

Cadastrar tarefa

GET

/tarefas

Listar tarefas

GET

/tarefas/:id

Consultar detalhes de uma tarefa

PUT

/tarefas/:id

Atualizar informações e status

4.3. Comunicação entre frontend e backend

A comunicação é realizada por meio da Fetch API.

O backend possui configuração de CORS para permitir requisições provenientes do frontend durante o desenvolvimento local.

5. Banco de dados

O sistema utiliza PostgreSQL, hospedado no Supabase, com Prisma ORM para realizar a comunicação entre a aplicação e o banco de dados.

Entidades implementadas

Disciplina

ID

Nome

Carga horária

Tarefa

ID

Título

Descrição

Data de entrega

Prioridade

Status

Disciplina vinculada

Uma disciplina pode possuir várias tarefas, enquanto cada tarefa pertence a uma disciplina.

Limitação atual: ainda não existe uma entidade de usuário autenticado. Portanto, as disciplinas e tarefas não estão separadas por estudante.

Essa estrutura será ampliada na implementação do login Google.

6. Como executar o projeto

Pré-requisitos

Node.js instalado.

npm disponível.

Backend configurado e em execução.

Banco de dados PostgreSQL configurado.

6.1. Clonar o repositório

git clone https://github.com/dani-melo/minha-tarefa-ui.git

6.2. Acessar a pasta

cd minha-tarefa-ui

6.3. Instalar as dependências

npm install

6.4. Iniciar o frontend

npm run dev

A aplicação estará disponível, normalmente, em:

http://localhost:5173

6.5. Configuração da API

Durante o desenvolvimento local, o frontend utiliza o endereço:

http://localhost:3000

Para utilizar as funcionalidades integradas, é necessário manter o backend em execução.

O backend está disponível em um repositório separado.

7. Estrutura do frontend

Principais diretórios e arquivos do projeto:

minha-tarefa-ui/
├── public/
├── src/
│   ├── components/
│   │   └── Sidebar/
│   │       ├── Sidebar.tsx
│   │       └── Sidebar.css
│   ├── layouts/
│   │   ├── AppLayout.tsx
│   │   └── AppLayout.css
│   ├── pages/
│   │   ├── Identificacao/
│   │   ├── Home/
│   │   ├── Disciplinas/
│   │   │   ├── Disciplinas.tsx
│   │   │   └── Disciplinas.css
│   │   └── Tarefas/
│   │       ├── CadastroTarefa.tsx
│   │       ├── DetalhesTarefa.tsx
│   │       └── ListaTarefas.tsx
│   ├── services/
│   │   └── api.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── README.md

8. Situação atual do desenvolvimento

Funcionalidades concluídas

Estrutura inicial do frontend.

Criação e versionamento dos repositórios.

Implementação da tela de identificação.

Implementação da página inicial.

Criação do menu lateral de navegação.

Implementação das telas de disciplinas.

Implementação das telas de tarefas.

Desenvolvimento dos oito endpoints da API.

Configuração do banco de dados PostgreSQL.

Integração do frontend com o backend.

Configuração do CORS.

Testes locais de cadastro, edição e exclusão de disciplinas.

Testes locais de cadastro, listagem, edição e atualização de status das tarefas.

Funcionalidades e melhorias planejadas

Autenticação e gerenciamento de usuários

Implementar login com conta Google (Gmail).

Criar estrutura de usuários no banco de dados.

Associar disciplinas e tarefas ao usuário autenticado.

Garantir que cada estudante visualize e gerencie somente seus próprios dados.

Implementar controle de sessão e logout.

Melhorias no frontend

Atualizar dinamicamente os indicadores da Home.

Exibir próximas tarefas a partir dos dados da API.

Integrar os filtros de tarefas aos dados.

Aprimorar mensagens de carregamento, erro e confirmação.

Realizar ajustes de responsividade e usabilidade.

Melhorias no backend

Implementar endpoint de exclusão de tarefas.

Adicionar autenticação e autorização nas rotas.

Adaptar os relacionamentos do banco de dados para os usuários.

Ampliar as validações e o tratamento de erros.

Publicação

Preparar a aplicação para ambiente de produção.

Publicar o frontend na Vercel.

Publicar o backend no Render.

Configurar variáveis de ambiente e comunicação entre os serviços.

Realizar testes após a publicação.

9. Próxima etapa: autenticação com Google

Uma das principais melhorias planejadas é a substituição da identificação simples pelo nome por um sistema de autenticação com conta Google.

Essa alteração foi definida após verificar que a identificação apenas pelo nome não permite distinguir os estudantes de maneira segura.

Com a autenticação, cada estudante deverá possuir um acesso individual, permitindo que suas disciplinas e tarefas sejam vinculadas à sua conta.

Resultados esperados

Acesso por meio de uma conta Google.

Identificação individual do estudante.

Armazenamento das disciplinas e tarefas por usuário.

Proteção dos dados contra acesso por outros estudantes.

Continuidade do acesso aos dados em diferentes dispositivos.

Status: funcionalidade planejada, ainda não implementada.

10. Repositórios do projeto

Frontend:
https://github.com/dani-melo/minha-tarefa-ui

Backend:
https://github.com/dani-melo/minha-tarefa-api

O desenvolvimento está sendo realizado com versionamento em branches específicas, permitindo organizar as alterações antes da integração à branch principal.

11. Contexto acadêmico

O Minha Tarefa é desenvolvido como projeto acadêmico do curso de Tecnologia em Sistemas para Internet.

O projeto envolve a aplicação prática de conhecimentos relacionados a:

Desenvolvimento de interfaces web.

Programação com React e TypeScript.

Desenvolvimento de APIs REST.

Modelagem e persistência de dados.

Integração entre frontend e backend.

Versionamento com Git e GitHub.

Organização de atividades de desenvolvimento.

12. Status do projeto

Em desenvolvimento.

As principais funcionalidades de gerenciamento de disciplinas e tarefas estão implementadas e integradas localmente à API REST.

As próximas etapas incluem autenticação com Google, associação dos dados aos usuários, melhorias na interface e publicação da aplicação em ambiente de produção.
