# FinanceHub — Roteiro de testes integrados (pendentes)
Este roteiro requer Node.js e MySQL Server instalados e configurados. Os testes abaixo não foram executados no MySQL local do estudante.
## Preparação
1. Faça backup se o banco já existir.
2. Em um banco novo, execute sql/financehub_entrega2.sql e depois sql/financehub_entrega3_migracao.sql.
3. Copie backend/.env.example para backend/.env e configure credenciais próprias e JWT_SECRET.
4. Na pasta backend execute npm install, npm test, npm run criar-admin (só uma vez) e npm start.
## Autenticação (Entrega 2)
- [ ] Login correto retorna JWT.
- [ ] Senha inválida retorna 401.
- [ ] Rota protegida sem token retorna 401.
- [ ] JWT expirado retorna 401.
- [ ] Usuário inativo não consegue usar token antigo.
- [ ] Funcionário recebe 403 ao acessar API de usuários.
- [ ] Senha fica armazenada no MySQL como hash bcrypt.
## CRUD (Entrega 3)
- [ ] Administrador faz POST, GET, PUT e DELETE de receita.
- [ ] Administrador faz POST, GET, PUT e DELETE de despesa.
- [ ] Registros são criados/alterados/excluídos de fato no MySQL.
- [ ] Valores negativos, datas inválidas e categorias incompatíveis são rejeitados na API.
- [ ] Funcionário recebe 403 ao tentar DELETE na API.
- [ ] Funcionário recebe 403 ao editar registro de outro usuário.
- [ ] Indicadores incluem somente despesas pagas no período.
## Limite da verificação
Foram aprovados 12 testes automatizados unitários/de regras de negócio. Eles não substituem os testes integrados acima.


## Validação final — Entrega 4 (a executar com MySQL real)
- [ ] MySQL Server está rodando; ambos os scripts SQL executam sem erro.
- [ ] npm install, npm test, npm start, login admin e funcionário funcionam.
- [ ] Funcionário só vê os próprios lançamentos ao chamar GET /api/receitas e /api/despesas.
- [ ] Funcionário recebe 403 ao editar registro de outro usuário ou excluir qualquer registro.
- [ ] Painel não conta despesas pendentes como já pagas.
- [ ] GET /api/projecao retorna estimativa de 30 dias com metodologia.
- [ ] Funcionário recebe 403 ao acessar GET /api/projecao.
- [ ] No MySQL, SELECT confirma inserções/edições/exclusões feitas no navegador.
- [ ] Código da Entrega 4 e README aparecem no GitHub, no mesmo repositório.
**Nota:** esta lista não significa execução comprovada. Preencha apenas após testar na máquina de apresentação.
