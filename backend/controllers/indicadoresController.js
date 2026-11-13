const pool=require('../database/conexao');
const {intervaloValido}=require('../services/financeiro');
async function painel(req,res,next){try{
 const {inicio,fim}=req.query;if(!intervaloValido(inicio,fim))return res.status(400).json({mensagem:'Informe período válido no formato AAAA-MM-DD.'});
 const [[r],[d],[pix],[dias]] = await Promise.all([
  pool.execute('SELECT COALESCE(SUM(valor),0) AS total,COUNT(*) AS quantidade FROM receitas WHERE data_recebimento BETWEEN ? AND ?',[inicio,fim]),
  pool.execute("SELECT COALESCE(SUM(valor),0) AS total,COUNT(*) AS quantidade, COALESCE(SUM(CASE WHEN categoria_id IN (SELECT id FROM categorias WHERE tipo='despesa' AND nome='Impostos') THEN valor ELSE 0 END),0) AS impostos FROM despesas WHERE status='paga' AND data_pagamento BETWEEN ? AND ?",[inicio,fim]),
  pool.execute('SELECT forma_pagamento,COALESCE(SUM(valor),0) AS total FROM receitas WHERE data_recebimento BETWEEN ? AND ? GROUP BY forma_pagamento',[inicio,fim]),
  pool.execute('SELECT DATE_FORMAT(data_recebimento,"%Y-%m-%d") AS dia, SUM(valor) AS total FROM receitas WHERE data_recebimento BETWEEN ? AND ? GROUP BY data_recebimento ORDER BY data_recebimento',[inicio,fim])
 ]);
 const entradas=Number(r[0].total),saidas=Number(d[0].total);
 res.json({periodo:{inicio,fim},entradas,saidas,resultado:entradas-saidas,impostos:Number(d[0].impostos),quantidadeReceitas:r[0].quantidade,quantidadeDespesasPagas:d[0].quantidade,porPagamento:pix,dias});
}catch(e){next(e)}}
module.exports={painel};
