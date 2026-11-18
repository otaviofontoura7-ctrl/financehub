const test=require('node:test');
const assert=require('node:assert/strict');
const {projetarFluxo}=require('../services/projecao');
test('projeção utiliza histórico menos contas previstas',()=> assert.deepEqual(projetarFluxo('1000.10','750.20'),{receitaEstimada:1000.1,despesasPrevistas:750.2,saldoEstimado:249.9}));
test('projeção zerada sem histórico',()=>assert.deepEqual(projetarFluxo(0,0),{receitaEstimada:0,despesasPrevistas:0,saldoEstimado:0}));
test('projeção não aceita números negativos/inválidos',()=>assert.deepEqual(projetarFluxo(-100,'abc'),{receitaEstimada:0,despesasPrevistas:0,saldoEstimado:0}));
