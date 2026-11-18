function centavos(v){
  const n=Number(v);
  if(!Number.isFinite(n) || n<0)return 0;
  return Math.round(n*100);
}
function projetarFluxo(receitasUltimos30Dias,contasAVencer30Dias){
  const receita=centavos(receitasUltimos30Dias),despesas=centavos(contasAVencer30Dias);
  return {receitaEstimada:receita/100, despesasPrevistas:despesas/100, saldoEstimado:(receita-despesas)/100};
}
module.exports={projetarFluxo};
