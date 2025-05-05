# Carteira Digital - Teste Técnico

Projeto fullstack desenvolvido em Next.js 15 com App Router, Prisma, SQLite, React Query, Zustand, ShadCN, entre outras tecnologias modernas.

---

## Funcionalidades

- Cadastro e login com autenticação via token
- Visualização de saldo
- Depósitos e transferências entre usuários
- Reversão de transações
- Interface moderna e responsiva inspirada em bancos digitais
- Feedbacks visuais usando Sonner + padrão Observer
- Proteção de rotas (públicas e privadas)
- Scroll interno inteligente nas transações
- Dados persistidos no SessionStorage

---

## Arquitetura

- **Next.js 15 (App Router)** com estrutura modular por domínio
- **Princípios SOLID** na organização de camadas (`core`, `modules`, `shared`)
- **Zustand** para estados locais e persistentes
- **React Query v5** para dados assíncronos
- **Prisma** + **SQLite** no backend
- **Docker** com build multistage
- Separação clara entre responsabilidades: componentes, serviços, hooks e stores

---

## Como rodar localmente

```bash
# Instalar dependências
npm install

# Gerar o banco local e rodar o projeto
npx prisma migrate dev
npm run dev
