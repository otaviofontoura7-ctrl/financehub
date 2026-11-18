# FinanceHub — Relatório de verificação técnica para a Entrega 4

**Data da revisão:** 18/11/2026
**Escopo:** código das Entregas 1, 2, 3 e 4; não inclui apresentação em slides.

## Correções que respondem às avaliações anteriores
- **Entrega 2:** scripts SQL executáveis com as tabelas usuarios, categorias, receitas e despesas, relacionamentos e migração; README de instalação e .env.example sem credenciais.
- **Entrega 3:** página inicial com formulário real loginForm, área loginError, e-mail/senha e script /js/login.js; formulário usa POST /api/auth/login, recebe JWT e redireciona para /dashboard.
- **Entrega 4:** CRUD, autenticação, indicadores, permissões e estimativa financeira; listagem de funcionário limitada aos próprios lançamentos.

## Verificações realizadas
- **19 testes automatizados, 19 aprovados, 0 falhas** (comando: cd backend && npm test).
- Sintaxe dos arquivos JavaScript verificada por node --check, sem erros.
- Inspeção da estrutura do pacote, arquivos de login, CRUD, SQL e .gitignore.

## Limites da verificação
Esses testes **não** são uma execução completa com servidor MySQL. Não foi possível instalar dependências externas e rodar o aplicativo completo com MySQL neste ambiente. Portanto, funcionamento de npm start, login, API, CRUD e painel no navegador **ainda precisa ser validado** no computador de apresentação.

## Checklist antes de apresentar
- [ ] Node.js e MySQL Server instalados.
- [ ] Scripts SQL da Entrega 2 e migração da Entrega 3 executados.
- [ ] .env local configurado, sem divulgar credenciais.
- [ ] npm install, npm test e npm start executados com sucesso.
- [ ] Login administrador e funcionário conferidos.
- [ ] CRUD receitas/despesas e persistência no MySQL conferidos.
- [ ] Permissões negadas pela API verificadas.
- [ ] PDF dos slides, elaborado pelo estudante, enviado à pasta docs, caso exigido.

Consulte docs/TESTES_MANUAIS.md e docs/APRESENTACAO_ENTREGA4.md.
