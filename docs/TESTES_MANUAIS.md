# FinanceHub — Roteiro de testes integrados e evidências
Este roteiro distingue os pontos **observados na demonstração local** dos testes ainda não comprovados. O ambiente do estudante utiliza Node.js e MySQL Server 8.
## Preparação
1. Faça backup se o banco já existir.
2. Em um banco novo, execute sql/financehub_entrega2.sql e depois sql/financehub_entrega3_migracao.sql.
3. Copie backend/.env.example para backend/.env e configure credenciais próprias e JWT_SECRET.
4. Na pasta backend execute npm install, npm test, npm run criar-admin (só uma vez) e npm start.
## Autenticação (Entrega 2)
- [x] Login de administrador realizado pelo navegador; acesso à tela de usuários exibido (21/11/2026). O JWT não foi inspecionado diretamente.
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
O estudante mostrou a execução de **19 testes automatizados aprovados e nenhuma falha**. Eles não substituem os testes integrados acima.


## Validação final — Entrega 4 (itens observados e pendentes)
- [x] MySQL Server acessível: o sistema iniciou com o banco e exibiu a área de usuários. A execução completa de ambos os scripts SQL não foi auditada independentemente.
- [x] `npm install`, `npm test` (19 testes aprovados), servidor e login de administrador funcionaram no Windows. Login de funcionário ainda não comprovado.
- [ ] Funcionário só vê os próprios lançamentos ao chamar GET /api/receitas e /api/despesas.
- [ ] Funcionário recebe 403 ao editar registro de outro usuário ou excluir qualquer registro.
- [ ] Painel não conta despesas pendentes como já pagas.
- [ ] GET /api/projecao retorna estimativa de 30 dias com metodologia.
- [ ] Funcionário recebe 403 ao acessar GET /api/projecao.
- [ ] No MySQL, SELECT confirma inserções/edições/exclusões feitas no navegador.
- [ ] Código da Entrega 4 e README aparecem no GitHub, no mesmo repositório.
**Nota:** os itens marcados representam somente evidências relatadas ou mostradas nesta conversa. Itens não marcados permanecem por verificar. Evite publicar imagens com credenciais, tokens ou dados pessoais.
