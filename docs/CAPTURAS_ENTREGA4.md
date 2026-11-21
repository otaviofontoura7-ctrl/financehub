# FinanceHub — Evidências para apresentação da Entrega 4

Este arquivo organiza as capturas reais do sistema. Os prints **ainda não foram enviados para este repositório**; esta página é um guia, não uma afirmação de que as imagens estão publicadas.

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

## Organização sugerida

- Coloque capturas revisadas em `docs/evidencias/`.
- Coloque a apresentação final em `docs/apresentacao-financehub-entrega4.pdf`.
- Use nomes descritivos, por exemplo `01-login.png`, `02-visao-geral.png` etc.
- Identifique os lançamentos financeiros como **dados de demonstração**, caso sejam fictícios.

## Proteção de dados

Antes de publicar em um repositório público, remova ou oculte senhas, `JWT_SECRET`, tokens, chaves, `.env`, e-mails pessoais desnecessários e quaisquer informações de terceiros. Não suba `node_modules` ou cópias locais do banco. Caso uma credencial tenha sido exibida em captura, substitua-a no ambiente local.

## Situação da validação

Em 21/11/2026, foi relatada a execução de 19 testes automatizados sem falhas e foi mostrada a sessão autenticada do administrador, com a tela de usuários do FinanceHub. Isso não implica aprovação de todos os testes de integração ou das operações CRUD; execute o roteiro de `docs/TESTES_MANUAIS.md` para verificar os demais pontos.
