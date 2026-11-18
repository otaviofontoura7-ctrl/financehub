const VALID_DATE = /^\d{4}-\d{2}-\d{2}$/;
function dataValida(v) {
  if (typeof v !== 'string' || !VALID_DATE.test(v)) return false;
  const [y,m,d] = v.split('-').map(Number);
  const dt = new Date(Date.UTC(y,m-1,d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m-1 && dt.getUTCDate() === d;
}
function valorValido(v) { return (typeof v === 'string' || typeof v === 'number') && String(v).trim() !== '' && Number.isFinite(Number(v)) && Number(v) > 0 && Number(v) <= 9999999999.99 && /^\d+(?:\.\d{1,2})?$/.test(String(v)); }
function validarMovimento(tipo, obj) {
  if (!obj || typeof obj !== 'object') return 'Dados inválidos.';
  if (typeof obj.descricao !== 'string' || obj.descricao.trim().length < 3 || obj.descricao.trim().length > 255) return 'Descrição deve ter entre 3 e 255 caracteres.';
  if (!valorValido(obj.valor)) return 'Valor inválido. Use um valor positivo com até duas casas decimais.';
  if (!/^\d+$/.test(String(obj.categoria_id)) || !Number.isSafeInteger(Number(obj.categoria_id)) || Number(obj.categoria_id) <= 0) return 'Selecione uma categoria válida.';
  if (obj.observacao != null && (typeof obj.observacao !== 'string' || obj.observacao.length > 2000)) return 'Observação deve ter até 2000 caracteres.';
  if (tipo === 'receita') {
    if (!dataValida(obj.data_recebimento)) return 'Data de recebimento inválida.';
    if (!['pix','cartao','dinheiro','outros'].includes(obj.forma_pagamento)) return 'Selecione uma forma de pagamento válida.';
  } else if (tipo === 'despesa') {
    if (!dataValida(obj.data_vencimento)) return 'Data de vencimento inválida.';
    if (!['pendente','paga'].includes(obj.status)) return 'Status inválido.';
    if (obj.status === 'paga' && !dataValida(obj.data_pagamento)) return 'Informe uma data de pagamento válida.';
    if (obj.status === 'pendente' && obj.data_pagamento != null && obj.data_pagamento !== '') return 'Despesa pendente não pode ter data de pagamento.';
  } else return 'Tipo inválido.';
  return null;
}
function podeAlterar(usuario, autorId) { return usuario.perfil === 'administrador' || Number(usuario.id) === Number(autorId); }
function podeExcluir(usuario) { return usuario.perfil === 'administrador'; }
function intervaloValido(inicio,fim) { return dataValida(inicio) && dataValida(fim) && inicio <= fim; }
module.exports={dataValida,valorValido,validarMovimento,podeAlterar,podeExcluir,intervaloValido};
