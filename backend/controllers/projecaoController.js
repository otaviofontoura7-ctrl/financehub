const pool = require('../database/conexao');
const { projetarFluxo } = require('../services/projecao');
async function projetar(req,res,next) {
  try {
    const [[recebimentos],[pendentes]] = await Promise.all([
      pool.execute('SELECT COALESCE(SUM(valor),0) AS total, COUNT(*) AS quantidade FROM receitas WHERE data_recebimento BETWEEN DATE_SUB(CURDATE(), INTERVAL 29 DAY) AND CURDATE()'),
      pool.execute("SELECT COALESCE(SUM(valor),0) AS total, COUNT(*) AS quantidade FROM despesas WHERE status = 'pendente' AND data_vencimento BETWEEN DATE_ADD(CURDATE(), INTERVAL 1 DAY) AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)")
    ]);
    const calculo = projetarFluxo(recebimentos[0].total,pendentes[0].total);
    res.json({...calculo,quantidadeReceitasHistoricas:recebimentos[0].quantidade,quantidadeContasPrevistas:pendentes[0].quantidade,metodologia:'Estimativa ilustrativa: repete os recebimentos dos últimos 30 dias e subtrai despesas pendentes com vencimento nos próximos 30 dias. Não considera novas despesas, sazonalidade, saldo bancário, impostos não lançados nem garante recebimentos. Sem histórico, a receita estimada é zero. Não é projeção contábil.'});
  } catch(err) {next(err)}
}
module.exports={projetar};
