# FinanceHub — Sistema de Gestão Financeira Empresarial

## Entrega 1: problema, proposta e estrutura inicial

### Problema identificado
Pequenos e médios empresários frequentemente controlam suas finanças em anotações e planilhas dispersas. Essa fragmentação dificulta saber quanto entrou, quanto saiu, quanto foi pago em impostos, quais meios de pagamento geram mais recebimentos e qual o fluxo de caixa disponível. Sem indicadores consolidados, decisões sobre despesas, investimentos e planejamento de faturamento ficam menos fundamentadas.

### Público afetado
Proprietários, gestores e funcionários responsáveis pelo registro financeiro de uma única empresa.

### Proposta de solução
Desenvolver o **FinanceHub**, um sistema web para centralizar entradas e saídas, impostos, recebimentos por Pix, cartão e dinheiro, fluxo financeiro, relatórios e projeções. A interface inicial nesta entrega é um **protótipo demonstrativo**, sem autenticação real ou banco de dados integrado. Esses componentes serão implementados nas entregas posteriores.

### Funcionalidades previstas
- Login e cadastro com senhas protegidas, autenticação JWT e permissões.
- Cadastro, consulta, edição e exclusão de receitas e despesas (CRUD).
- Categorização de despesas e acompanhamento de impostos pagos.
- Registro da forma de recebimento: Pix, cartão, dinheiro e outros.
- Painel com receitas, despesas, resultado financeiro e margem.
- Fluxo de caixa e contas a pagar por período.
- Dias de maior faturamento e comparações mensais.
- Projeção estimada de faturamento a partir do histórico, explicitando premissas.
- Relatórios e filtros por período.

### Perfis de acesso planejados
**Administrador/empresário:** visualiza todos os indicadores e relatórios, gerencia usuários, cadastra, edita e exclui registros.

**Funcionário:** registra e consulta movimentações autorizadas e pode editar registros conforme política da empresa, sem acesso à gestão de usuários e relatórios restritos.

As permissões serão aplicadas no servidor, não apenas ocultando botões.

### Fluxo básico previsto
1. O usuário acessa a página de login.
2. O servidor valida suas credenciais e perfil (implementação na Entrega 2).
3. O usuário entra no painel financeiro.
4. Registra receitas (incluindo forma de pagamento) e despesas (inclusive impostos).
5. A API valida os dados e grava no MySQL (Entregas 2 e 3).
6. O sistema calcula indicadores e apresenta gráficos, comparações e projeções.
7. O administrador consulta relatórios e utiliza os dados para decisões.

### Escopo e regras de negócio
- O projeto atende **uma única empresa**, sem filiais.
- Receitas recebidas e despesas pagas serão separadas de valores apenas previstos ou pendentes.
- Resultado de caixa = recebimentos − pagamentos do período.
- Tributos serão registrados por lançamento próprio; o sistema não substitui a contabilidade ou apura automaticamente impostos legais.
- Projeções serão **estimativas**, não garantias de faturamento.
- Indicadores não devem exibir valores inventados como reais.

### Tecnologias exigidas
- Front-end: HTML, CSS e JavaScript (DOM e Fetch API).
- Back-end: Node.js e Express.
- Banco de dados: MySQL relacional.
- Autenticação e autorização: JWT e middlewares.

### Estrutura do projeto
```text
financehub/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── database/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── css/
│   ├── js/
│   ├── index.html
│   └── dashboard.html
├── sql/
│   └── modelagem-planejada.sql
├── docs/
│   └── PLANO-DE-ENTREGAS.md
├── README.md
└── .gitignore
```

### Como executar o protótipo da Entrega 1
1. Instale Node.js.
2. Abra a pasta `backend` no terminal.
3. Execute `npm install`.
4. Execute `npm start`.
5. Acesse `http://localhost:3000`.

A página de entrada e o painel são **demonstrativos**: não há validação de senha nem dados financeiros reais nesta fase. Não use o protótipo para armazenar informações confidenciais.

### Cronograma conforme o enunciado
- **Entrega 1:** problema, solução, perfis, fluxo, estrutura, README e GitHub.
- **Entrega 2:** banco MySQL relacionado, cadastro/login, proteção de senhas, JWT e permissões.
- **Entrega 3:** CRUD completo via API REST, Fetch e MySQL, validações e permissões.
- **Entrega 4:** funcionalidades finalizadas, testes, documentação e apresentação.

### Versionamento
Manter as quatro entregas neste mesmo repositório, com commits claros. Nunca publicar `node_modules`, `.env`, senhas, tokens ou credenciais privadas.
