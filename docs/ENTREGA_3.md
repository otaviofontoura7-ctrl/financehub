# Entrega 3 — Lista de verificação

- [x] CRUD REST de receitas — POST, GET, PUT e DELETE
- [x] CRUD REST de despesas — POST, GET, PUT e DELETE
- [x] Interface HTML/CSS/JavaScript via DOM e Fetch
- [x] SQL parametrizado com MySQL
- [x] Middlewares JWT e autorização no servidor
- [x] Funcionário não exclui e só edita lançamentos próprios
- [x] Validações de datas, valores, categorias e meios de pagamento
- [x] Scripts executáveis SQL das Entregas 2 e 3
- [x] Código das Entregas 1 e 2 preservado no mesmo repositório
- [ ] Testes integrados com servidor MySQL, que exigem ambiente local

## Como apresentar ao professor
1. Instale Node.js e MySQL 8 e execute os scripts SQL.
2. Configure backend/.env localmente, sem enviar credenciais para GitHub.
3. Execute npm install, npm test, npm run criar-admin e npm start em backend.
4. Faça login como administrador; cadastre, consulte, edite e exclua uma receita e uma despesa.
5. Mostre os indicadores por período e os registros no MySQL.
6. Entre como funcionário e demonstre restrições inclusive na API (403).
7. Explique controllers, routes, middlewares e chaves estrangeiras.
8. Consulte docs/TESTES_MANUAIS.md para o roteiro completo.

## Limites da verificação
12 testes automatizados passaram no ambiente de desenvolvimento. Não foi realizado teste ponta a ponta com MySQL nesta publicação.
