# FinanceHub — Gestão Financeira Empresarial

**Entregas 1, 2, 3 e 4 | Projeto acadêmico em um único repositório**

## Problema e solução (Entrega 1)
Pequenos empresários registram receitas e despesas em anotações e planilhas separadas, dificultando o controle financeiro. O FinanceHub centraliza receitas, despesas, meios de recebimento, tributos registrados e resultado de caixa de uma única empresa.

**Público:** empresários, administradores e funcionários responsáveis por lançamentos.
**Tecnologias:** Node.js, Express, MySQL 8, HTML, CSS, JavaScript, DOM, Fetch, bcrypt e JWT.

## Entrega 2 — Banco de dados e autenticação
- Banco relacional com **usuarios, categorias, receitas, despesas**, chaves primárias e estrangeiras.
- Login e cadastro com senhas protegidas por bcrypt.
- JWT HS256, expiração de duas horas, autenticação e autorização no servidor.
- Administrador gerencia usuários; funcionário tem acesso limitado.

**Correção após avaliação:** o script SQL executável que faltava no repositório foi incluído em `sql/financehub_entrega2.sql`. O antigo `sql/modelagem-planejada.sql` permanece como documento histórico, não como instalador do banco.

## Entrega 3 — CRUD financeiro
- API REST com **POST, GET, PUT e DELETE** para receitas e despesas, ligada ao MySQL.
- Interface em HTML, CSS e JavaScript; integração por DOM e Fetch.
- Administrador gerencia todos os registros e pode excluir.
- Funcionário cadastra, consulta e edita os próprios registros; **não pode excluir**.
- A autorização deve ser checada na API, não só pela interface.
- Indicadores reais: receitas recebidas, despesas pagas, resultado de caixa e impostos pagos.
- Entrega 4 implementa projeção simplificada para os próximos 30 dias (ver seção específica).

## Estrutura
- `backend/controllers`: login, movimentações e indicadores;
- `backend/routes`: rotas REST;
- `backend/middlewares`: JWT e validações;
- `backend/database`: conexão MySQL;
- `backend/services`: regras financeiras;
- `backend/tests`: testes automatizados;
- `frontend`: interface HTML/CSS/JS;
- `sql`: SQL executável e migrações;
- `docs`: etapas e roteiro de validação.

## Instalação e execução
**Requisitos:** Node.js 18+ e MySQL Server 8. O Workbench é opcional para administrar o banco.

1. Instale Node.js e MySQL Server.
2. Em banco novo, execute **`sql/financehub_entrega2.sql`** e depois **`sql/financehub_entrega3_migracao.sql`**. Se já possuir dados, faça backup antes de migrar.
3. Copie `backend/.env.example` para `backend/.env` e configure **DB_HOST**, **DB_PORT**, **DB_USER**, **DB_PASSWORD**, **DB_NAME**, **JWT_SECRET** (chave própria com ao menos 32 caracteres) e **PORT**.
4. Abra o terminal na pasta `backend` e execute:

```sh
npm install
npm test
npm run criar-admin
npm start
```
O comando `npm run criar-admin` deve ser executado apenas se ainda não existir administrador no banco.
5. Abra **http://localhost:3000**.

**Não publique** `.env`, senhas, tokens ou `node_modules`.

## Rotas principais
| Método | Rota | Acesso |
|---|---|---|
| POST | /api/auth/login | Público |
| GET | /api/auth/me | Autenticado |
| POST | /api/auth/register | Administrador |
| GET | /api/auth/usuarios | Administrador |
| GET | /api/categorias | Autenticado |
| GET / POST | /api/receitas | Autenticado |
| PUT | /api/receitas/:id | Administrador ou autor |
| DELETE | /api/receitas/:id | Administrador |
| GET / POST | /api/despesas | Autenticado |
| PUT | /api/despesas/:id | Administrador ou autor |
| DELETE | /api/despesas/:id | Administrador |
| GET | /api/indicadores | Administrador |

## Testes, limites e histórico
Na execução local informada para a preparação da Entrega 4, **19 testes automatizados foram aprovados, sem falhas**. Eles não substituem todos os testes de integração e autorização da API com MySQL. O sistema também foi iniciado no Windows com MySQL e o login de administrador foi realizado; o acesso à tela de usuários foi confirmado. As demais operações devem ser verificadas pelo roteiro de testes manuais. Consulte `docs/TESTES_MANUAIS.md`.

As Entregas 1, 2, 3 e 4 estão organizadas neste mesmo repositório. Consulte o histórico de commits para acompanhar a evolução.

## Entrega 4 — Consolidação e apresentação final

- Os códigos das Entregas 1, 2 e 3 foram preservados no mesmo repositório; o servidor agora disponibiliza indicadores e uma **projeção explícita**.
- A projeção dos próximos 30 dias repete o valor efetivamente recebido nos 30 dias anteriores e desconta despesas **pendentes** que vencem nos próximos 30 dias. Não considera sazonalidade, novos pagamentos, saldo bancário ou impostos não lançados. **É uma estimativa simplificada, não uma garantia de faturamento ou lucro.**
- Regra reforçada no backend: funcionários só listam e editam seus lançamentos. Somente administradores podem excluir e consultar indicadores e projeção.
- Leia `docs/APRESENTACAO_ENTREGA4.md` antes da apresentação e execute `docs/TESTES_MANUAIS.md` com MySQL Server.
- Este repositório inclui `VERIFICAR_WINDOWS.bat` para verificar Node.js e rodar os testes automatizados em Windows; não substitui a configuração do banco.

### Rotas adicionais da Entrega 4

| Método | Rota | Acesso |
| --- | --- | --- |
| GET | `/api/projecao` | Administrador |

### Como executar no novo computador

1. Instale Node.js LTS e **MySQL Server 8**. MySQL Workbench é recomendado, mas não substitui o Server.
2. Em banco novo, execute `sql/financehub_entrega2.sql` e depois `sql/financehub_entrega3_migracao.sql`. Se houver dados antigos, faça backup antes.
3. Copie `backend/.env.example` para `backend/.env` e coloque **suas próprias** credenciais MySQL e `JWT_SECRET` aleatória de 32 caracteres ou mais. Não publique esse arquivo.
4. Dentro de `backend`, execute `npm install`, `npm test`, `npm run criar-admin` (só na primeira configuração sem administrador) e `npm start`.
5. Abra `http://localhost:3000` e teste as operações com administrador e funcionário, incluindo permissões pela API.

**Validação atualizada em 21/11/2026:** o estudante informou **19 testes automatizados aprovados, sem falhas**, e demonstrou em captura de tela o FinanceHub conectado ao MySQL, com sessão de administrador e listagem de usuários. Isso comprova o funcionamento das etapas observadas, mas não constitui auditoria completa de todos os fluxos ou permissões. Para os demais testes, consulte `docs/TESTES_MANUAIS.md`. Evite publicar senhas, `.env`, tokens e `node_modules`.

## Evidências da apresentação

Veja `docs/CAPTURAS_ENTREGA4.md` para a lista de telas a documentar e as orientações de segurança. As capturas e o PDF dos slides podem ser adicionados à pasta `docs/evidencias/` após revisão para remover credenciais e informações pessoais desnecessárias.
