# Apresentação final — FinanceHub

## Roteiro demonstrativo (6–9 minutos)
1. **Problema:** empresas pequenas dispersam receitas e despesas em vários controles; FinanceHub consolida lançamentos de **uma empresa**.
2. **Arquitetura:** HTML/CSS/JS + DOM + Fetch, rotas e controllers Express, middlewares JWT, serviços, banco MySQL.
3. **Banco:** mostre usuarios, categorias, receitas e despesas, chaves primárias e estrangeiras.
4. **Login:** entre como administrador; explique hash bcrypt, JWT, prazo de validade e bloqueio de usuários inativos.
5. **CRUD:** cadastre uma receita, consulte, edite e exclua. Repita com despesa; altere de pendente para paga.
6. **Perfis:** funcionário só consegue registrar, listar e editar lançamentos próprios. API bloqueia exclusão e acesso aos usuários/indicadores consolidados.
7. **Resultados:** explique que resultado de caixa é entradas recebidas menos saídas pagas (não lucro contábil). Mostre impostos registrados e projeção de 30 dias, indicando que é **estimativa**, não garantia.
8. **GitHub:** mostre README, SQL, testes e evolução dos commits no mesmo repositório.

## Perguntas frequentes
- CRUD: Create POST, Read GET, Update PUT, Delete DELETE.
- JWT: token assinado que autentica sessão; servidor verifica assinatura, expiração e usuário ativo.
- Senha: armazenada como hash bcrypt, nunca em texto puro.
- Por que checar API: ocultar botões não bloqueia requisições diretas.
- Banco relacional: PKs e FKs mantêm relação entre usuários, categorias e lançamentos.
- Diferença entre fluxo e lucro: fluxo considera pagamentos/recebimentos realizados; não equivale à contabilidade por competência.
- Projeção: repete recebimentos dos últimos 30 dias, desconta contas pendentes dos próximos 30. Exclui sazonalidade e variáveis não registradas.

## Antes da apresentação
- [ ] Node.js e MySQL Server instalados.
- [ ] Banco criado e scripts SQL executados.
- [ ] backend/.env configurado apenas localmente.
- [ ] npm install, npm test e npm start funcionam.
- [ ] Login de administrador e funcionário funciona.
- [ ] CRUD de receitas e despesas funciona, incluindo dados no MySQL.
- [ ] API rejeita acessos indevidos.
- [ ] Painel e projeção mostram valores dos registros de teste, não dados inventados.
- [ ] GitHub possui arquivos atualizados e histórico das quatro entregas.
