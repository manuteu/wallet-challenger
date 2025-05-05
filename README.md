# Carteira Digital - Teste Técnico

Projeto fullstack desenvolvido em Next.js 15 com App Router, Prisma, SQLite, React Query, Zustand, ShadCN, entre outras tecnologias modernas.

---

## Funcionalidades

- Cadastro e login com autenticação via token
- Visualização de saldo
- Depósitos e transferências entre usuários
- Reversão de transações
- Feedbacks visuais usando Sonner + padrão Observer
- Proteção de rotas (públicas e privadas)
- Dados persistidos no SessionStorage

---

## Arquitetura

- **Next.js 15 (App Router)** com estrutura modular por domínio
- **Princípios SOLID** na organização de camadas (`core`, `modules`, `shared`)
- **Zustand** para estados locais e persistentes
- **React Query v5** para dados assíncronos
- **Prisma** + **SQLite** no backend
- **Docker** com build
- Separação clara entre responsabilidades: componentes, serviços, hooks e stores

---

## Como rodar localmente

```bash
# Instalar dependências
npm install

# Gerar o banco local e rodar o projeto
npx prisma migrate dev
npm run dev
```

```bash
## Docker
docker-compose up --build
```

## Autenticação

- Após login, o token é salvo no sessionStorage junto com os dados do usuário.
- A aplicação protege rotas via redirecionamento e checagem de token.
- Rotas que retornam 401 acionam automaticamente o logout.

## Libs utilizadas

- Tailwind CSS
- ShadCN UI
- Sonner (toasts)
- React Hook Form + Zod
- Axios com interceptors
