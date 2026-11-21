# FinanceHub — Evidências para apresentação da Entrega 4

Este arquivo organiza as capturas reais do sistema. **Arquivos publicados e conferidos em 21/11/2026:** os slides finais em PDF e PPTX e cinco capturas diferentes do sistema constam neste repositório. Algumas telas (como despesas, impostos e fluxo de caixa) não têm captura específica nesta entrega; estão disponíveis na aplicação para a demonstração presencial.

## Capturas recomendadas

1. **Login:** formulário de acesso ao sistema.
2. **Visão geral:** indicadores financeiros após lançamentos de demonstração.
3. **Receitas:** cadastro e listagem de receitas, incluindo forma de recebimento.
4. **Despesas:** cadastro e listagem com status de pagamento.
5. **Impostos:** visualização de tributos lançados.
6. **Fluxo de caixa:** entradas recebidas, despesas pagas e saldo do período.
7. **Projeção:** estimativa para os próximos 30 dias e sua metodologia.
8. **Usuários:** cadastro e lista de usuários, demonstrando o acesso administrativo.
9. **Testes automatizados:** saída do terminal mostrando resultados, sem dados sensíveis.
10. **GitHub:** estrutura do projeto, SQL, README e histórico de commits.

## Arquivos efetivamente publicados

- [Apresentação completa em PDF](apresentacao-financehub-entrega4.pdf)
- [Apresentação editável em PowerPoint](apresentacao-financehub-entrega4.pptx)
- [01 — Tela de login](evidencias/01-login.png)
- [02 — Visão geral como administrador](evidencias/02-visao-geral-admin.png)
- [03 — Tela de receitas](evidencias/03-receitas.png)
- [04 — Projeção financeira de 30 dias](evidencias/04-projecao.png)
- [05 — Visão geral com perfil funcionário](evidencias/05-visao-geral-funcionario.png)

As telas capturadas não possuem movimentações lançadas; indicadores de R$ 0,00 representam ausência de dados no período mostrado, não faturamento validado. Não há prints de uma execução completa de todas as operações CRUD.

## Proteção de dados

Antes de publicar em um repositório público, remova ou oculte senhas, `JWT_SECRET`, tokens, chaves, `.env`, e-mails pessoais desnecessários e quaisquer informações de terceiros. Não suba `node_modules` ou cópias locais do banco. Caso uma credencial tenha sido exibida em captura, substitua-a no ambiente local.

## Situação da validação

Em 21/11/2026, foi relatada a execução de 19 testes automatizados sem falhas e foi mostrada a sessão autenticada do administrador, com a tela de usuários do FinanceHub. Isso não implica aprovação de todos os testes de integração ou das operações CRUD; execute o roteiro de `docs/TESTES_MANUAIS.md` para verificar os demais pontos.
